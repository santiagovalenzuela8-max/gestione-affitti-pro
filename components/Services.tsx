import Image from "next/image";
import { IconCalendarCheck, IconKey, IconTrendingUp, IconWrench } from "./icons";
import { Reveal } from "./Reveal";

const services = [
  {
    icon: IconCalendarCheck,
    title: "Gestione multi-piattaforma",
    description:
      "Creiamo e ottimizziamo gli annunci su Airbnb, Booking e altri portali, sincronizzando calendari e prenotazioni per evitare sovrapposizioni.",
    image: "/images/services/gestione-multi-piattaforma.jpg",
  },
  {
    icon: IconKey,
    title: "Check-in, check-out e pulizie",
    description:
      "Accoglienza degli ospiti, consegna chiavi e pulizie professionali tra un soggiorno e l’altro: la tua casa è sempre pronta e curata.",
    image: "/images/services/check-in-pulizie.jpg",
  },
  {
    icon: IconTrendingUp,
    title: "Pricing dinamico",
    description:
      "Analizziamo domanda, stagionalità ed eventi locali per adeguare le tariffe ogni giorno e massimizzare il tuo incasso, senza lasciare notti vuote.",
    image: "/images/services/pricing-dinamico.jpg",
  },
  {
    icon: IconWrench,
    title: "Manutenzione e assistenza 24/7",
    description:
      "Piccole riparazioni, manutenzione ordinaria e assistenza agli ospiti a qualsiasi ora: tu non ricevi nemmeno una chiamata.",
    image: "/images/services/manutenzione.jpg",
  },
];

export function Services() {
  return (
    <section id="servizi" className="bg-paper py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
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
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden border border-paper-line bg-paper-line sm:grid-cols-2">
          {services.map((service, index) => (
            <Reveal
              key={service.title}
              delay={index * 100}
              className="group relative overflow-hidden bg-paper transition hover:bg-noir"
            >
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(min-width: 640px) 50vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-8">
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
