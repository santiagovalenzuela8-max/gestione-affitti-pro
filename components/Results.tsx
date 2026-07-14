import { Reveal } from "./Reveal";

const results = [
  { value: "+31%", label: "incasso medio nel primo anno di gestione" },
  { value: "78%", label: "tasso di occupazione medio annuo" },
  { value: "120+", label: "proprietari che si affidano a noi" },
  { value: "9,2", label: "punteggio medio pulizia su Airbnb" },
];

export function Results() {
  return (
    <section id="risultati" className="bg-noir py-24 text-paper">
      <div className="hairline-gold h-px w-full" />
      <div className="mx-auto max-w-6xl px-6 pt-14">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-400">
            Risultati concreti
          </p>
          <h2 className="mt-4 font-serif text-3xl text-paper sm:text-4xl">
            Non promesse: numeri verificabili sui nostri immobili
          </h2>
          <p className="mt-4 text-lg text-paper/70">
            Ogni proprietario riceve accesso a un dashboard con prenotazioni, incassi e
            recensioni in tempo reale: nessuna sorpresa a fine mese.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-8 lg:grid-cols-4">
          {results.map((result, index) => (
            <Reveal
              key={result.label}
              delay={index * 100}
              className="border border-white/10 bg-white/5 p-6 text-center"
            >
              <p className="font-serif text-4xl text-cyan-400">{result.value}</p>
              <p className="mt-2 text-sm text-paper/70">{result.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
