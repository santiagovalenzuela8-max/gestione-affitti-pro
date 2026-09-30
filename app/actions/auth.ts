"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { prisma } from "@/lib/db";
import { createSession, deleteSession, getSessionPayload } from "@/lib/session";
import { isRateLimited } from "@/lib/rateLimit";
import { isLikelyBot } from "@/lib/botCheck";
import {
  ChangePasswordFormSchema,
  ChangePasswordFormState,
  LoginFormSchema,
  LoginFormState,
} from "@/lib/authValidation";

async function getClientIp() {
  const headerList = await headers();
  return headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

export async function login(
  _state: LoginFormState,
  formData: FormData,
): Promise<LoginFormState> {
  if (isLikelyBot(formData)) {
    return { message: "Email o password non corretti." };
  }

  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { email, password } = validatedFields.data;

  const ip = await getClientIp();
  if (isRateLimited(`login:${ip}:${email}`)) {
    return { message: "Troppi tentativi. Riprova tra qualche minuto." };
  }

  const user = await prisma.user.findUnique({ where: { email } });
  const genericError = { message: "Email o password non corretti." };

  if (!user || !user.passwordHash) {
    // Esegui comunque un hash per non far trapelare via timing se l'utente
    // esiste (compreso il caso di un account creato solo con Google).
    await bcrypt.hash(password, 12);
    return genericError;
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatches) {
    return genericError;
  }

  await createSession(user.id);
  redirect("/area-clienti/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/area-clienti/login");
}

export async function changePassword(
  _state: ChangePasswordFormState,
  formData: FormData,
): Promise<ChangePasswordFormState> {
  const session = await getSessionPayload();
  if (!session) {
    redirect("/area-clienti/login");
  }

  const validatedFields = ChangePasswordFormSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { currentPassword, newPassword } = validatedFields.data;

  const user = await prisma.user.findUnique({ where: { id: session.userId } });
  if (!user) {
    redirect("/area-clienti/login");
  }

  if (user.passwordHash) {
    const matches = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!matches) {
      return { message: "La password attuale non è corretta." };
    }
  }

  const newPasswordHash = await bcrypt.hash(newPassword, 12);
  await prisma.user.update({
    where: { id: user.id },
    data: { passwordHash: newPasswordHash },
  });

  return { success: true, message: "Password aggiornata." };
}
