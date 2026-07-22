import { Resend } from "resend";

const CONTACT_NOTIFY_EMAIL = "Santiagovalenzuela8@gmail.com";

export type ContactRequest = {
  nome: string;
  telefono: string;
  email: string;
  comune: string;
  tipo: string;
  messaggio: string;
};

export async function sendContactNotification(data: ContactRequest): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.warn(
      "RESEND_API_KEY non configurato: notifica email non inviata per la richiesta di",
      data.nome,
    );
    return;
  }

  const resend = new Resend(apiKey);
  await resend.emails.send({
    from: "Gestione Affitti Pro <onboarding@resend.dev>",
    to: CONTACT_NOTIFY_EMAIL,
    replyTo: data.email,
    subject: `Nuova richiesta di valutazione da ${data.nome}`,
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2>Nuova richiesta di valutazione</h2>
        <p><strong>Nome:</strong> ${data.nome}</p>
        <p><strong>Telefono:</strong> ${data.telefono}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Comune:</strong> ${data.comune}</p>
        <p><strong>Tipo di immobile:</strong> ${data.tipo || "Non specificato"}</p>
        ${data.messaggio ? `<p><strong>Messaggio:</strong> ${data.messaggio}</p>` : ""}
      </div>
    `,
  });
}
