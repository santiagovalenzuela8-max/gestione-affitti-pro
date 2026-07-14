import { IconCalendarCheck, IconKey, IconTrendingUp, IconWrench } from "./icons";

const services = [
  {
    icon: IconCalendarCheck,
    title: "Gestione multi-piattaforma",
    description:
      "Creiamo e ottimizziamo gli annunci su Airbnb, Booking e altri portali, sincronizzando calendari e prenotazioni per evitare sovrapposizioni.",
  },
  {
    icon: IconKey,
    title: "Check-in, check-out e pulizie",
    description:
      "Accoglienza degli ospiti, consegna chiavi e pulizie professionali tra un soggiorno e l’altro: la tua casa è sempre pronta e curata.",
  },
  {
    icon: IconTrendingUp,
    title: "Pricing dinamico",
    description:
      "Analizziamo domanda, stagionalità ed eventi locali per adeguare le tariffe ogni giorno e massimizzare il tuo incasso, senza lasciare notti vuote.",
  },
  {
    icon: IconWrench,
    title: "Manutenzione e assistenza 24/7",
    description:
      "Piccole riparazioni, manutenzione ordinaria e assistenza agli ospiti a qualsiasi ora: tu non ricevi nemmeno una chiamata.",
  },
];

export function Services() {
  return (
    <section id="servizi" className="bg-paper py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
            Cosa facciamo
          </p>
          <h2 className="mt-4 font-serif text-3xl text-ink sm:text-4xl">
            Un unico referente per tutto ciò che serve alla tua casa vacanze
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            Dall’annuncio online al bucato, dal check-in alla dichiarazione dei redditi:
            gestiamo ogni dettaglio dell’affitto breve così tu devi solo controllare l’incasso.
          </p>
        </div>

        <div className="mt-14 grid gap-px overflow-hidden border border-paper-line bg-paper-line sm:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative bg-paper p-8 transition hover:bg-noir"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 text-ink transition group-hover:border-gold-500/50 group-hover:text-gold-500">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 font-serif text-xl text-ink transition group-hover:text-paper">
                {service.title}
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink-soft transition group-hover:text-paper/70">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
