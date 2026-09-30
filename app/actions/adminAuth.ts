"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createAdminSession, deleteAdminSession } from "@/lib/adminSession";
import { isRateLimited } from "@/lib/rateLimit";
import { AdminLoginFormSchema, AdminLoginFormState } from "@/lib/adminAuthValidation";

async function getClientIp() {
  const headerList = await headers();
  return headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
}

export async function adminLogin(
  _state: AdminLoginFormState,
  formData: FormData,
): Promise<AdminLoginFormState> {
  const validatedFields = AdminLoginFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return { errors: validatedFields.error.flatten().fieldErrors };
  }

  const { email, password } = validatedFields.data;

  const ip = await getClientIp();
  if (isRateLimited(`admin-login:${ip}`)) {
    return { message: "Troppi tentativi. Riprova tra qualche minuto." };
  }

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;
  const genericError = { message: "Email o password non corretti." };

  if (!adminEmail || !adminPasswordHash) {
    return { message: "Accesso amministratore non configurato." };
  }

  // Esegui sempre l'hash/confronto anche se l'email non combacia, per non far
  // trapelare via timing quale credenziale (se una delle due) è quella corretta.
  const emailMatches = email === adminEmail;
  const passwordMatches = await bcrypt.compare(password, adminPasswordHash);

  if (!emailMatches || !passwordMatches) {
    return genericError;
  }

  await createAdminSession();
  redirect("/admin");
}

export async function adminLogout() {
  await deleteAdminSession();
  redirect("/admin/login");
}
