import { IconMapPin } from "./icons";

const zones = [
  {
    name: "Lago di Garda",
    towns: ["Bardolino", "Peschiera del Garda", "Sirmione", "Malcesine", "Lazise", "Garda"],
  },
  {
    name: "Verona e provincia",
    towns: ["Verona centro", "Valpolicella", "Soave", "Villafranca di Verona"],
  },
  {
    name: "Trentino",
    towns: ["Trento", "Rovereto", "Val di Non", "Madonna di Campiglio", "Riva del Garda"],
  },
];

export function Zones() {
  return (
    <section id="zone" className="bg-paper py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
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
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {zones.map((zone) => (
            <div
              key={zone.name}
              className="border border-paper-line bg-paper p-7 transition hover:border-gold-500/40"
            >
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
          ))}
        </div>
      </div>
    </section>
  );
}
