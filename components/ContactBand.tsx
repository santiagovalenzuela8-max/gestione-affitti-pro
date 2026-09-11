import Link from "next/link";
import { IconArrowRight, IconPhone, IconWhatsApp } from "./icons";
import { Reveal } from "./Reveal";

export function ContactBand() {
  return (
    <section className="bg-noir py-20 text-paper sm:py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
            Parliamone
          </p>
          <h2 className="mt-4 font-serif text-3xl text-paper sm:text-4xl">
            Richiedi una valutazione gratuita della tua casa
          </h2>
          <p className="mt-4 text-lg text-paper/70">
            Ti rispondiamo entro 24 ore con una stima realistica di incasso e occupazione, senza
            impegno.
          </p>

          <div className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/contatti"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-paper px-7 py-3.5 text-base font-semibold text-ink shadow-lg transition hover:bg-paper-dim hover:-translate-y-0.5"
            >
              Contattaci
              <IconArrowRight className="h-4.5 w-4.5 transition group-hover:translate-x-0.5" />
            </Link>
            <a
              href="tel:+393488307749"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-base font-semibold text-paper transition hover:border-white/40"
            >
              <IconPhone className="h-4.5 w-4.5 text-gold-400" />
              +39 348 830 7749
            </a>
            <a
              href="https://wa.me/393488307749?text=Ciao%2C%20vorrei%20una%20valutazione%20gratuita%20della%20mia%20casa%20vacanze"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-base font-semibold text-paper transition hover:border-white/40"
            >
              <IconWhatsApp className="h-4.5 w-4.5 text-[#25D366]" />
              WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
