import { IconArrowRight, IconStar } from "./icons";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-paper">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-14 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:pb-28 lg:pt-20">
        <div>
          <p
            className="animate-fade-up inline-flex items-center gap-2 border border-gold-500/40 bg-gold-100/60 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-gold-700"
            style={{ animationDelay: "0ms" }}
          >
            Verona · Lago di Garda · Trentino
          </p>

          <h1
            className="animate-fade-up mt-6 max-w-xl font-serif text-4xl leading-[1.1] tracking-tight text-ink text-balance sm:text-5xl lg:text-[3.4rem]"
            style={{ animationDelay: "90ms" }}
          >
            La tua casa vacanze merita di rendere{" "}
            <span className="italic text-cyan-600">di più</span>, con meno pensieri.
          </h1>

          <p
            className="animate-fade-up mt-6 max-w-lg text-lg leading-relaxed text-ink-soft"
            style={{ animationDelay: "180ms" }}
          >
            Gestione Affitti Pro segue ogni fase dell’affitto breve al posto tuo: annunci su
            Airbnb e Booking, check-in, pulizie, prezzi ottimizzati e manutenzione. Tu incassi,
            noi ci occupiamo del resto.
          </p>

          <div
            className="animate-fade-up mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ animationDelay: "270ms" }}
          >
            <a
              href="#contatti"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-7 py-3.5 text-base font-semibold text-paper shadow-lg shadow-ink/15 transition hover:bg-noir-soft hover:shadow-xl hover:-translate-y-0.5"
            >
              Richiedi una valutazione gratuita
              <IconArrowRight className="h-4.5 w-4.5 transition group-hover:translate-x-0.5" />
            </a>
            <a
              href="#servizi"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-ink/20 px-7 py-3.5 text-base font-semibold text-ink transition hover:border-ink/40 hover:bg-paper-dim"
            >
              Scopri i servizi
            </a>
          </div>

          <div
            className="animate-fade-up mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-ink-soft"
            style={{ animationDelay: "360ms" }}
          >
            <div className="flex items-center gap-1.5">
              <div className="flex text-gold-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <IconStar key={i} className="h-4 w-4" />
                ))}
              </div>
              <span className="font-semibold text-ink">4,9/5</span>
              <span>valutazione media ospiti</span>
            </div>
            <div>
              <span className="font-semibold text-ink">120+</span> case gestite
            </div>
            <div>
              <span className="font-semibold text-ink">+31%</span> incasso medio
            </div>
          </div>
        </div>

        <div
          className="animate-fade-up relative mx-auto aspect-[4/5] w-full max-w-md lg:max-w-none"
          style={{ animationDelay: "220ms" }}
        >
          <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-noir via-noir-soft to-noir shadow-2xl shadow-ink/30" />
          <div className="absolute inset-4 rounded-[1.1rem] border border-white/10" />
          <div className="animate-float-slow absolute -right-6 -top-6 h-40 w-40 rounded-full bg-cyan-500/30 blur-3xl" />
          <div className="animate-float-slower absolute left-8 top-14 h-24 w-24 rounded-full bg-gold-500/40 blur-2xl" />

          <div className="absolute inset-x-8 top-10 hairline-gold h-px" />

          <div className="absolute bottom-7 left-7 right-7 rounded-xl border border-gold-500/20 bg-paper/95 p-5 shadow-xl backdrop-blur">
            <p className="font-serif text-sm italic text-ink">
              &ldquo;In un anno abbiamo aumentato l’occupazione della nostra casa a Bardolino
              del 40%.&rdquo;
            </p>
            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-gold-700">
              Famiglia Bertani, proprietari a Bardolino
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
