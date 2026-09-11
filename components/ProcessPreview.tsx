import Link from "next/link";
import { IconArrowRight } from "./icons";
import { Reveal } from "./Reveal";

const steps = [
  { number: "01", title: "Valutazione gratuita" },
  { number: "02", title: "Foto, annuncio e messa online" },
  { number: "03", title: "Gestione completa" },
  { number: "04", title: "Report mensile e incasso" },
];

export function ProcessPreview() {
  return (
    <section id="come-funziona" className="bg-paper-dim py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
            Come funziona
          </p>
          <h2 className="mt-4 font-serif text-3xl text-ink sm:text-4xl">
            Dalla prima chiamata al primo bonifico
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 90} className="border-l-2 border-gold-300 pl-4">
              <span className="font-serif text-3xl text-gold-400">{step.number}</span>
              <p className="mt-2 text-[15px] font-medium leading-snug text-ink">{step.title}</p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={360} className="mt-10">
          <Link
            href="/come-funziona"
            className="group inline-flex items-center gap-2 text-base font-semibold text-ink transition hover:text-gold-700"
          >
            Scopri il processo completo
            <IconArrowRight className="h-4.5 w-4.5 transition group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
