import Link from "next/link";
import { IconArrowRight, IconCalendarCheck, IconLock, IconTrendingUp } from "./icons";
import { Reveal } from "./Reveal";

const features = [
  {
    icon: IconTrendingUp,
    text: "Incasso, spese e profitto netto aggiornati ogni mese",
  },
  {
    icon: IconCalendarCheck,
    text: "Storico completo di tutti i rapportini, sempre consultabile",
  },
  {
    icon: IconLock,
    text: "Accesso privato e sicuro, anche con un click tramite Google",
  },
];

const chartBars = [38, 52, 46, 64, 58, 82];

export function ClientPortalSection() {
  return (
    <section className="relative overflow-hidden bg-noir py-24 text-paper">
      <div className="hairline-gold h-px w-full" />
      <div
        className="animate-float-slow pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl"
        aria-hidden
      />
      <div
        className="animate-float-slower pointer-events-none absolute -left-24 bottom-10 h-72 w-72 rounded-full bg-gold-500/10 blur-3xl"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-6 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <Reveal>
          <div className="inline-flex items-center gap-2 border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-gold-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
            </span>
            Area Clienti
          </div>

          <h2 className="mt-5 max-w-lg font-serif text-3xl leading-tight text-paper text-balance sm:text-4xl">
            I tuoi guadagni, sempre aggiornati e a portata di click
          </h2>

          <p className="mt-5 max-w-lg text-lg leading-relaxed text-paper/70">
            Ogni proprietario ha una dashboard personale e riservata, pensata per la massima
            trasparenza: niente attese, niente richieste via email. I tuoi numeri, quando vuoi tu.
          </p>

          <ul className="mt-8 space-y-4">
            {features.map((feature) => (
              <li key={feature.text} className="flex items-start gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-cyan-400">
                  <feature.icon className="h-4.5 w-4.5" />
                </span>
                <span className="pt-1.5 text-[15px] leading-snug text-paper/80">
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>

          <Link
            href="/area-clienti"
            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-paper px-7 py-3.5 text-base font-semibold text-ink shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            Accedi alla tua area clienti
            <IconArrowRight className="h-4.5 w-4.5 transition group-hover:translate-x-0.5" />
          </Link>
        </Reveal>

        <Reveal delay={150} className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <div className="rounded-[1.25rem] border border-white/10 bg-paper p-6 shadow-2xl shadow-ink/40 sm:p-7">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-gold-700">
                Settembre 2026 · Villa sul Lago
              </p>
              <span className="flex items-center gap-1.5 text-[11px] font-medium text-cyan-700">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-500 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-500" />
                </span>
                Aggiornato oggi
              </span>
            </div>

            <div className="mt-5 flex items-end gap-2">
              {chartBars.map((height, index) => (
                <div
                  key={index}
                  className={`flex-1 rounded-t-sm ${
                    index === chartBars.length - 1
                      ? "bg-gradient-to-t from-cyan-600 to-cyan-400"
                      : "bg-paper-line"
                  }`}
                  style={{ height: `${height}px` }}
                />
              ))}
            </div>

            <dl className="mt-6 space-y-2.5 border-t border-paper-line pt-5 text-sm">
              <div className="flex items-center justify-between">
                <dt className="text-ink-soft">Incasso lordo</dt>
                <dd className="font-semibold text-ink">3.480,00 €</dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="text-ink-soft">Spese di gestione</dt>
                <dd className="text-ink">690,00 €</dd>
              </div>
              <div className="flex items-center justify-between border-t border-paper-line pt-2.5">
                <dt className="font-semibold text-ink">Profitto netto</dt>
                <dd className="font-serif text-xl text-cyan-700">2.790,00 €</dd>
              </div>
              <div className="flex items-center justify-between pt-1 text-ink-soft">
                <dt>Occupazione</dt>
                <dd>79%</dd>
              </div>
            </dl>
          </div>

          <div className="pointer-events-none absolute -right-4 -top-4 -z-10 h-full w-full rounded-[1.25rem] border border-gold-500/20 sm:-right-5 sm:-top-5" />
        </Reveal>
      </div>

      <div className="hairline-gold mt-14 h-px w-full" />
    </section>
  );
}
