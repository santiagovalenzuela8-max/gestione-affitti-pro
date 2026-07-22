import { NextRequest, NextResponse } from "next/server";
import { sendContactNotification } from "@/lib/email";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Richiesta non valida" }, { status: 400 });
  }

  const { nome, telefono, email, comune, tipo, messaggio } = (body ?? {}) as Record<
    string,
    unknown
  >;

  if (typeof nome !== "string" || !nome.trim()) {
    return NextResponse.json({ error: "Inserisci il tuo nome." }, { status: 400 });
  }
  if (typeof telefono !== "string" || !telefono.trim()) {
    return NextResponse.json({ error: "Inserisci un numero di telefono." }, { status: 400 });
  }
  if (typeof email !== "string" || !EMAIL_REGEX.test(email.trim())) {
    return NextResponse.json({ error: "Inserisci un indirizzo email valido." }, { status: 400 });
  }
  if (typeof comune !== "string" || !comune.trim()) {
    return NextResponse.json({ error: "Inserisci il comune dell'immobile." }, { status: 400 });
  }

  try {
    await sendContactNotification({
      nome: nome.trim().slice(0, 200),
      telefono: telefono.trim().slice(0, 50),
      email: email.trim().slice(0, 200),
      comune: comune.trim().slice(0, 200),
      tipo: typeof tipo === "string" ? tipo.trim().slice(0, 100) : "",
      messaggio: typeof messaggio === "string" ? messaggio.trim().slice(0, 2000) : "",
    });
  } catch (error) {
    console.error("Invio email richiesta di contatto fallito", error);
    return NextResponse.json(
      { error: "Errore durante l'invio della richiesta. Riprova più tardi." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}
