import Image from "next/image";
import { IconMapPin } from "./icons";
import { Reveal } from "./Reveal";

const zones = [
  {
    name: "Lago di Garda",
    towns: ["Bardolino", "Peschiera del Garda", "Sirmione", "Malcesine", "Lazise", "Garda"],
    image: "/images/zones/lago-di-garda.jpg",
  },
  {
    name: "Verona e provincia",
    towns: ["Verona centro", "Valpolicella", "Soave", "Villafranca di Verona"],
    image: "/images/zones/verona.jpg",
    imagePosition: "center 75%",
  },
  {
    name: "Trentino",
    towns: ["Trento", "Rovereto", "Val di Non", "Madonna di Campiglio", "Riva del Garda"],
    image: "/images/zones/trentino.jpg",
  },
];

export function Zones() {
  return (
    <section id="zone" className="bg-paper py-24">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
            Zone servite
          </p>
          <h2 className="mt-4 font-serif text-3xl text-ink sm:text-4xl">
            Conosciamo il territorio, casa per casa
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            Operiamo direttamente sul posto tra Verona, Lago di Garda e Trentino: nessun
            fornitore esterno, nessun ritardo nella gestione delle emergenze.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {zones.map((zone, index) => (
            <Reveal
              key={zone.name}
              delay={index * 100}
              className="group overflow-hidden border border-paper-line bg-paper transition hover:border-gold-500/40"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <Image
                  src={zone.image}
                  alt={zone.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  style={{ objectPosition: zone.imagePosition ?? "center" }}
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-noir/70 via-noir/0 to-noir/0" />
              </div>
              <div className="p-7">
                <div className="flex items-center gap-2 text-ink">
                  <IconMapPin className="h-5 w-5 text-cyan-600" />
                  <h3 className="font-serif text-xl text-ink">{zone.name}</h3>
                </div>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {zone.towns.map((town) => (
                    <li
                      key={town}
                      className="border border-paper-line bg-paper-dim px-3 py-1 text-sm text-ink-soft"
                    >
                      {town}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
