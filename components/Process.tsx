const steps = [
  {
    number: "01",
    title: "Valutazione gratuita",
    description:
      "Visitiamo la casa (o ce la mostri in videochiamata) e ti diciamo quanto puoi realisticamente incassare ogni mese.",
  },
  {
    number: "02",
    title: "Foto, annuncio e messa online",
    description:
      "Servizio fotografico, testi ottimizzati e pubblicazione su Airbnb, Booking e altri canali entro 7 giorni.",
  },
  {
    number: "03",
    title: "Gestione completa",
    description:
      "Prenotazioni, comunicazioni con gli ospiti, check-in, pulizie e manutenzione: te ne occupiamo noi, ogni giorno.",
  },
  {
    number: "04",
    title: "Report mensile e incasso",
    description:
      "Ricevi ogni mese un report chiaro su prenotazioni, occupazione e guadagni, con il bonifico già accreditato.",
  },
];

export function Process() {
  return (
    <section id="come-funziona" className="bg-paper-dim py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
            Come funziona
          </p>
          <h2 className="mt-4 font-serif text-3xl text-ink sm:text-4xl">
            Dalla prima chiamata al primo bonifico
          </h2>
        </div>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.number} className="relative pl-1">
              <span className="font-serif text-5xl text-gold-300">{step.number}</span>
              <h3 className="mt-4 font-serif text-lg text-ink">{step.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{step.description}</p>
              {index < steps.length - 1 ? (
                <div className="mt-6 hidden h-px w-full bg-gradient-to-r from-gold-300/70 to-transparent lg:block" />
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
