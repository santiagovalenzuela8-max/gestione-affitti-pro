"use server";

import bcrypt from "bcryptjs";
import { randomBytes } from "node:crypto";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import { getAdminSessionPayload } from "@/lib/adminSession";
import { sendWelcomeClientEmail } from "@/lib/email";
import {
  NewClientFormSchema,
  NewClientFormState,
  NewReportFormSchema,
  NewReportFormState,
} from "@/lib/adminAuthValidation";

async function requireAdmin() {
  const session = await getAdminSessionPayload();
  if (!session) {
    redirect("/admin/login");
  }
}

function generateTemporaryPassword() {
  return randomBytes(9).toString("base64url");
}

export async function createClient(
  _state: NewClientFormState,
  formData: FormData,
): Promise<NewClientFormState> {
  await requireAdmin();

  const validatedFields = NewClientFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    propertyName: formData.get("propertyName"),
    propertyLocation: formData.get("propertyLocation"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { name, email, propertyName, propertyLocation } = validatedFields.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    await prisma.property.create({
      data: {
        userId: existing.id,
        name: propertyName,
        location: propertyLocation,
      },
    });
    revalidatePath("/admin");
    return {
      success: true,
      message: `Immobile aggiunto al cliente esistente (${email}).`,
    };
  }

  const temporaryPassword = generateTemporaryPassword();
  const passwordHash = await bcrypt.hash(temporaryPassword, 12);

  await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
      properties: {
        create: { name: propertyName, location: propertyLocation },
      },
    },
  });

  try {
    await sendWelcomeClientEmail({
      name,
      email,
      temporaryPassword,
      propertyName,
    });
  } catch (error) {
    console.error("Invio email di benvenuto fallito", error);
  }

  revalidatePath("/admin");
  return { success: true, temporaryPassword };
}

export async function createReport(
  _state: NewReportFormState,
  formData: FormData,
): Promise<NewReportFormState> {
  await requireAdmin();

  const validatedFields = NewReportFormSchema.safeParse({
    propertyId: formData.get("propertyId"),
    month: formData.get("month"),
    incassoLordo: formData.get("incassoLordo"),
    speseGestione: formData.get("speseGestione"),
    altreSpese: formData.get("altreSpese") || undefined,
    nottiPrenotate: formData.get("nottiPrenotate") || undefined,
    tassoOccupazione: formData.get("tassoOccupazione") || undefined,
    note: formData.get("note") || undefined,
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const {
    propertyId,
    month,
    incassoLordo,
    speseGestione,
    altreSpese = 0,
    nottiPrenotate = 0,
    tassoOccupazione,
    note,
  } = validatedFields.data;

  const property = await prisma.property.findUnique({ where: { id: propertyId } });
  if (!property) {
    return { message: "Immobile non trovato." };
  }

  const monthDate = new Date(`${month}-01T00:00:00.000Z`);
  const profittoNetto = incassoLordo - speseGestione - altreSpese;

  await prisma.monthlyReport.upsert({
    where: { propertyId_month: { propertyId, month: monthDate } },
    create: {
      propertyId,
      month: monthDate,
      incassoLordo,
      speseGestione,
      altreSpese,
      profittoNetto,
      nottiPrenotate,
      tassoOccupazione,
      note,
    },
    update: {
      incassoLordo,
      speseGestione,
      altreSpese,
      profittoNetto,
      nottiPrenotate,
      tassoOccupazione,
      note,
    },
  });

  revalidatePath("/admin");
  return { success: true, message: "Rapportino salvato." };
}
