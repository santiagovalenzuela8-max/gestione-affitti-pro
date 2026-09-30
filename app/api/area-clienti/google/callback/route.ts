import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { createSession } from "@/lib/session";

// Callback OAuth di Google per l'Area Clienti: scambia il "code" per un
// access token, recupera il profilo (email, nome, id Google) e collega
// l'accesso a un cliente GIÀ creato dall'amministratore:
// - se esiste già uno User con questo googleId -> login
// - se esiste uno User con questa email (creato dall'admin) -> collega il
//   googleId e fa login
// - altrimenti nessun account: l'Area Clienti è ad invito, quindi rifiuta
//   l'accesso invece di creare automaticamente un nuovo cliente

function siteUrl() {
  return process.env.NEXT_PUBLIC_SITE_URL || "https://www.gestioneaffittipro.it";
}

type GoogleUserInfo = {
  sub: string;
  email?: string;
  email_verified?: boolean;
  name?: string;
};

export async function GET(request: NextRequest) {
  const loginUrl = `${siteUrl()}/area-clienti/login`;

  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get("code");
    const state = searchParams.get("state");
    const oauthError = searchParams.get("error");

    const cookieState = request.cookies.get("areaclienti_google_state")?.value;

    if (oauthError || !code || !state || !cookieState || state !== cookieState) {
      return NextResponse.redirect(`${loginUrl}?error=google_failed`);
    }

    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    if (!clientId || !clientSecret) {
      return NextResponse.redirect(`${loginUrl}?error=google_not_configured`);
    }

    const redirectUri = `${siteUrl()}/api/area-clienti/google/callback`;

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        grant_type: "authorization_code",
        redirect_uri: redirectUri,
      }),
    });

    if (!tokenResponse.ok) {
      return NextResponse.redirect(`${loginUrl}?error=google_failed`);
    }

    const tokenData = (await tokenResponse.json()) as { access_token?: string };
    if (!tokenData.access_token) {
      return NextResponse.redirect(`${loginUrl}?error=google_failed`);
    }

    const userInfoResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });

    if (!userInfoResponse.ok) {
      return NextResponse.redirect(`${loginUrl}?error=google_failed`);
    }

    const profile = (await userInfoResponse.json()) as GoogleUserInfo;
    const email = profile.email?.trim().toLowerCase();
    if (!profile.sub || !email) {
      return NextResponse.redirect(`${loginUrl}?error=google_failed`);
    }

    let user = await prisma.user.findUnique({ where: { googleId: profile.sub } });

    if (!user) {
      const existingByEmail = await prisma.user.findUnique({ where: { email } });

      if (!existingByEmail) {
        // Area riservata ai clienti già creati dall'agenzia: niente
        // registrazione automatica per email sconosciute.
        return NextResponse.redirect(`${loginUrl}?error=google_not_invited`);
      }

      user = await prisma.user.update({
        where: { id: existingByEmail.id },
        data: { googleId: profile.sub },
      });
    }

    await createSession(user.id);

    const response = NextResponse.redirect(`${siteUrl()}/area-clienti/dashboard`);
    response.cookies.delete("areaclienti_google_state");
    return response;
  } catch (error) {
    console.error("Errore callback Google Area Clienti:", error);
    return NextResponse.redirect(`${loginUrl}?error=google_failed`);
  }
}
