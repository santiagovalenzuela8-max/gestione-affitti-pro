import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const ADMIN_SESSION_COOKIE = "admin_session";
const ADMIN_SESSION_DURATION_MS = 12 * 60 * 60 * 1000; // 12 ore

function getSecretKey() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error(
      "ADMIN_SESSION_SECRET non configurata. Aggiungila alle variabili d'ambiente (openssl rand -base64 32).",
    );
  }
  return new TextEncoder().encode(secret);
}

export type AdminSessionPayload = {
  admin: true;
  expiresAt: number;
};

export async function encryptAdminSession(payload: AdminSessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(Math.floor(payload.expiresAt / 1000))
    .sign(getSecretKey());
}

export async function decryptAdminSession(token: string | undefined) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getSecretKey(), {
      algorithms: ["HS256"],
    });
    return payload as unknown as AdminSessionPayload;
  } catch {
    return null;
  }
}

export async function createAdminSession() {
  const expiresAt = Date.now() + ADMIN_SESSION_DURATION_MS;
  const token = await encryptAdminSession({ admin: true, expiresAt });
  const cookieStore = await cookies();

  cookieStore.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: new Date(expiresAt),
    path: "/",
  });
}

export async function deleteAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

export async function getAdminSessionPayload() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  return decryptAdminSession(token);
}
