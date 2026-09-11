import Link from "next/link";
import { IconArrowRight, IconCalendarCheck, IconKey, IconTrendingUp, IconWrench } from "./icons";
import { Reveal } from "./Reveal";

const services = [
  { icon: IconCalendarCheck, title: "Gestione multi-piattaforma" },
  { icon: IconKey, title: "Check-in, check-out e pulizie" },
  { icon: IconTrendingUp, title: "Pricing dinamico" },
  { icon: IconWrench, title: "Manutenzione e assistenza 24/7" },
];

export function ServicesPreview() {
  return (
    <section id="servizi" className="bg-paper py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
            Cosa facciamo
          </p>
          <h2 className="mt-4 font-serif text-3xl text-ink sm:text-4xl">
            Un unico referente per tutto ciò che serve alla tua casa vacanze
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <Reveal
              key={service.title}
              delay={index * 90}
              className="flex items-start gap-3 border border-paper-line bg-paper-dim p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-ink/15 text-ink">
                <service.icon className="h-5 w-5" />
              </div>
              <p className="pt-1.5 text-[15px] font-medium leading-snug text-ink">
                {service.title}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={360} className="mt-10">
          <Link
            href="/servizi"
            className="group inline-flex items-center gap-2 text-base font-semibold text-ink transition hover:text-gold-700"
          >
            Scopri tutti i servizi
            <IconArrowRight className="h-4.5 w-4.5 transition group-hover:translate-x-0.5" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
