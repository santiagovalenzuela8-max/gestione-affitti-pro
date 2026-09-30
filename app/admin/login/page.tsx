import type { Metadata } from "next";
import { AdminLoginForm } from "@/components/auth/AdminLoginForm";
import { IconLock } from "@/components/icons";

export const metadata: Metadata = {
  title: "Accesso amministratore | Gestione Affitti Pro",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <section className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-paper-dim px-6 py-20">
      <div className="w-full max-w-md border border-paper-line bg-paper p-8 shadow-sm shadow-ink/5">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-ink/10 text-ink">
            <IconLock className="h-6 w-6" />
          </span>
          <h1 className="mt-4 font-serif text-2xl text-ink">Pannello amministratore</h1>
          <p className="mt-1.5 text-sm text-ink-soft">
            Riservato a Gestione Affitti Pro per gestire clienti e rapportini.
          </p>
        </div>
        <AdminLoginForm />
      </div>
    </section>
  );
}
