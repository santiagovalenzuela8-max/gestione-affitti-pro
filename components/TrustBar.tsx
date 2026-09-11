import { AirbnbLogo, BookingLogo, ExpediaLogo, VrboLogo } from "./PlatformLogos";
import { Reveal } from "./Reveal";

const platforms = [
  { name: "Airbnb", Logo: AirbnbLogo },
  { name: "Booking.com", Logo: BookingLogo },
  { name: "Vrbo", Logo: VrboLogo },
  { name: "Expedia", Logo: ExpediaLogo },
];

const stats = [
  { value: "120+", label: "immobili in gestione" },
  { value: "+31%", label: "incasso medio annuo" },
  { value: "4,9/5", label: "valutazione media ospiti" },
  { value: "< 15 min", label: "tempo medio di risposta agli ospiti" },
];

export function TrustBar() {
  return (
    <section className="bg-noir py-14 text-paper">
      <div className="hairline-gold h-px w-full" />
      <div className="mx-auto max-w-6xl px-6 pt-14">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-gold-300">
          Presenti sulle piattaforme che contano
        </p>
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          {platforms.map((platform) => (
            <div
              key={platform.name}
              className="flex h-11 items-center rounded-full bg-paper px-5 shadow-sm"
            >
              <platform.Logo className="text-base" />
            </div>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 sm:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 90} className="text-center">
              <p className="font-serif text-3xl text-cyan-400">{stat.value}</p>
              <p className="mt-1 text-sm text-paper/70">{stat.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
      <div className="hairline-gold mt-14 h-px w-full" />
    </section>
  );
}
