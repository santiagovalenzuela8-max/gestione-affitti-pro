"use client";

import { useState, type FormEvent } from "react";
import { IconCheck, IconMail, IconPhone } from "./icons";

export function ContactCTA() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="contatti" className="bg-paper py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-12 border border-paper-line bg-paper p-8 shadow-sm shadow-ink/5 lg:grid-cols-[0.9fr_1.1fr] lg:p-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
              Parliamone
            </p>
            <h2 className="mt-4 font-serif text-3xl text-ink sm:text-4xl">
              Richiedi una valutazione gratuita della tua casa
            </h2>
            <p className="mt-4 text-lg text-ink-soft">
              Ti rispondiamo entro 24 ore con una stima realistica di incasso e occupazione,
              senza impegno.
            </p>

            <ul className="mt-8 space-y-3">
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
                href="mailto:info@gestioneaffittipro.it"
                className="flex items-center gap-2.5 hover:text-ink"
              >
                <IconMail className="h-4.5 w-4.5 text-gold-600" />
                info@gestioneaffittipro.it
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

                <button
                  type="submit"
                  className="mt-2 rounded-full bg-ink px-7 py-3.5 text-base font-semibold text-paper shadow-lg shadow-ink/15 transition hover:bg-noir-soft sm:col-span-2"
                >
                  Invia richiesta
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
