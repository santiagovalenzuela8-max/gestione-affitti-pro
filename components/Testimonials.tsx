import { IconStar } from "./icons";

const testimonials = [
  {
    quote:
      "Prima gestivo tutto da sola: messaggi agli ospiti, pulizie, prezzi. Ora ricevo solo il bonifico a fine mese e l’incasso è più alto di prima.",
    name: "Elena Bertani",
    location: "Proprietaria a Bardolino",
  },
  {
    quote:
      "Avevamo un appartamento a Trento quasi sempre vuoto. In sei mesi l’occupazione è passata dal 40% al 75%.",
    name: "Marco e Giulia Conti",
    location: "Proprietari a Trento",
  },
  {
    quote:
      "La cosa che apprezzo di più è la trasparenza: vedo ogni prenotazione e ogni spesa in tempo reale sul report.",
    name: "Roberto Salvi",
    location: "Proprietario a Sirmione",
  },
];

export function Testimonials() {
  return (
    <section className="bg-paper-dim py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">
            Chi si è già affidato a noi
          </p>
          <h2 className="mt-4 font-serif text-3xl text-ink sm:text-4xl">
            Proprietari che dormono sonni tranquilli
          </h2>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <figure
              key={testimonial.name}
              className="flex flex-col justify-between border-t-2 border-gold-500 bg-paper p-7 shadow-sm shadow-ink/5"
            >
              <div>
                <div className="flex text-gold-500">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <IconStar key={i} className="h-4 w-4" />
                  ))}
                </div>
                <blockquote className="mt-4 font-serif text-lg italic leading-relaxed text-ink">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
              </div>
              <figcaption className="mt-6 text-sm">
                <p className="font-semibold text-ink">{testimonial.name}</p>
                <p className="text-ink-soft">{testimonial.location}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
