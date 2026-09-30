import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";
import { IconLock } from "@/components/icons";

export const metadata: Metadata = {
  title: "Area Clienti | Gestione Affitti Pro",
  robots: { index: false, follow: false },
};

const googleErrorMessages: Record<string, string> = {
  google_failed: "Non siamo riusciti a completare l'accesso con Google. Riprova.",
  google_not_configured: "Il login con Google non è ancora attivo. Usa email e password.",
  google_not_invited:
    "Non troviamo un'area clienti attiva per questo indirizzo Google. Contattaci per l'attivazione.",
};

export default async function AreaClientiLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const googleError = error ? googleErrorMessages[error] : undefined;

  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-paper-dim px-6 py-20">
      <div className="w-full max-w-md border border-paper-line bg-paper p-8 shadow-sm shadow-ink/5">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-100 text-gold-700">
            <IconLock className="h-6 w-6" />
          </span>
          <h1 className="mt-4 font-serif text-2xl text-ink">Area Clienti</h1>
          <p className="mt-1.5 text-sm text-ink-soft">
            Accedi per consultare i rapportini mensili della tua casa vacanze.
          </p>
        </div>
        <LoginForm googleError={googleError} />
      </div>
    </section>
  );
}
