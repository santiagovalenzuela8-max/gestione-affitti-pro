import { NextResponse } from "next/server";
import { randomBytes } from "node:crypto";

// Avvia il login dell'Area Clienti con Google: genera uno "state" anti-CSRF,
// lo salva in un cookie di breve durata e reindirizza alla schermata di
// consenso di Google. Il callback (app/api/area-clienti/google/callback)
// verifica che lo state corrisponda prima di completare l'accesso.

function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://www.gestioneaffittipro.it";
}

export async function GET() {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId) {
    return NextResponse.redirect(
      `${siteUrl()}/area-clienti/login?error=google_not_configured`,
    );
  }

  const state = randomBytes(24).toString("hex");
  const redirectUri = `${siteUrl()}/api/area-clienti/google/callback`;

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    state,
    prompt: "select_account",
  });

  const response = NextResponse.redirect(
    `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`,
  );

  response.cookies.set("areaclienti_google_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 10,
    path: "/",
  });

  return response;
}
