"use client";

import { useState, type FormEvent } from "react";
import { IconCheck, IconPhone, IconWhatsApp } from "./icons";

export function ContactCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSending(true);

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch("/api/contatti", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(result?.error ?? "Errore durante l'invio della richiesta.");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Errore durante l'invio della richiesta.");
    } finally {
      setSending(false);
    }
  }

  return (
    <section className="bg-paper py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 border border-paper-line bg-paper p-8 shadow-sm shadow-ink/5 lg:grid-cols-[0.9fr_1.1fr] lg:p-12">
          <div>
            <h2 className="font-serif text-2xl text-ink sm:text-3xl">
              Nessuna sorpresa, solo trasparenza
            </h2>

            <ul className="mt-6 space-y-3">
              {[
                "Nessun costo per la valutazione",
                "Nessun vincolo di esclusiva",
                "Risposta entro 24 ore",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-ink-soft">
                  <IconCheck className="h-5 w-5 shrink-0 text-cyan-600" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-9 space-y-3 border-t border-paper-line pt-6 text-sm text-ink-soft">
              <a href="tel:+393488307749" className="flex items-center gap-2.5 hover:text-ink">
                <IconPhone className="h-4.5 w-4.5 text-gold-600" />
                +39 348 830 7749
              </a>
              <a
                href="https://wa.me/393488307749?text=Ciao%2C%20vorrei%20una%20valutazione%20gratuita%20della%20mia%20casa%20vacanze"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 hover:text-ink"
              >
                <IconWhatsApp className="h-4.5 w-4.5 text-[#25D366]" />
                Scrivici su WhatsApp
              </a>
            </div>
          </div>

          <div>
            {submitted ? (
              <div className="flex h-full flex-col items-center justify-center bg-noir p-10 text-center">
                <IconCheck className="h-10 w-10 text-cyan-400" />
                <h3 className="mt-4 font-serif text-2xl text-paper">Richiesta ricevuta!</h3>
                <p className="mt-2 max-w-sm text-paper/70">
                  Grazie per averci contattato. Un nostro consulente ti risponderà entro 24 ore
                  con la valutazione della tua casa.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5 text-sm font-medium text-ink sm:col-span-1">
                  Nome e cognome
                  <input
                    required
                    type="text"
                    name="nome"
                    className="rounded-lg border border-paper-line bg-paper-dim px-4 py-3 text-ink outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    placeholder="Mario Rossi"
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-sm font-medium text-ink sm:col-span-1">
                  Telefono
                  <input
                    required
                    type="tel"
                    name="telefono"
                    className="rounded-lg border border-paper-line bg-paper-dim px-4 py-3 text-ink outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    placeholder="+39 333 1234567"
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-sm font-medium text-ink sm:col-span-2">
                  Email
                  <input
                    required
                    type="email"
                    name="email"
                    className="rounded-lg border border-paper-line bg-paper-dim px-4 py-3 text-ink outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    placeholder="mario.rossi@email.it"
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-sm font-medium text-ink sm:col-span-1">
                  Comune dell’immobile
                  <input
                    required
                    type="text"
                    name="comune"
                    className="rounded-lg border border-paper-line bg-paper-dim px-4 py-3 text-ink outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    placeholder="Es. Bardolino"
                  />
                </label>

                <label className="flex flex-col gap-1.5 text-sm font-medium text-ink sm:col-span-1">
                  Tipo di immobile
                  <select
                    name="tipo"
                    defaultValue=""
                    className="rounded-lg border border-paper-line bg-paper-dim px-4 py-3 text-ink outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                  >
                    <option value="" disabled>
                      Seleziona
                    </option>
                    <option value="appartamento">Appartamento</option>
                    <option value="villa">Villa / casa indipendente</option>
                    <option value="baita">Baita / rustico</option>
                    <option value="altro">Altro</option>
                  </select>
                </label>

                <label className="flex flex-col gap-1.5 text-sm font-medium text-ink sm:col-span-2">
                  Messaggio (facoltativo)
                  <textarea
                    name="messaggio"
                    rows={3}
                    className="resize-none rounded-lg border border-paper-line bg-paper-dim px-4 py-3 text-ink outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100"
                    placeholder="Raccontaci qualcosa in più sulla tua casa..."
                  />
                </label>

                {error && (
                  <p className="text-sm font-medium text-red-600 sm:col-span-2">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={sending}
                  className="mt-2 rounded-full bg-ink px-7 py-3.5 text-base font-semibold text-paper shadow-lg shadow-ink/15 transition hover:bg-noir-soft disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
                >
                  {sending ? "Invio in corso..." : "Invia richiesta"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
