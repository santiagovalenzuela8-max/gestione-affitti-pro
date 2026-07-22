import { IconPhone } from "./icons";
import { Logo } from "./Logo";

const links = [
  { href: "#servizi", label: "Servizi" },
  { href: "#come-funziona", label: "Come funziona" },
  { href: "#zone", label: "Zone servite" },
  { href: "#risultati", label: "Risultati" },
  { href: "#contatti", label: "Contatti" },
];

export function Footer() {
  return (
    <footer className="bg-noir pb-24 text-paper lg:pb-0">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="flex items-center gap-2.5">
              <Logo className="h-8 w-8" variant="white" />
              <span className="flex items-baseline gap-1.5">
                <span className="font-serif text-xl font-semibold">Gestione Affitti</span>
                <span className="font-serif text-xl italic text-gold-400">Pro</span>
              </span>
            </p>
            <p className="mt-3 max-w-xs text-sm text-paper/60">
              Gestione professionale di affitti brevi su Airbnb e Booking a Verona, sul Lago di
              Garda e in Trentino.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-gold-400">
              Navigazione
            </p>
            <ul className="mt-4 space-y-2 text-sm text-paper/70">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-paper">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-gold-400">
              Contatti
            </p>
            <ul className="mt-4 space-y-2.5 text-sm text-paper/70">
              <li className="flex items-center gap-2">
                <IconPhone className="h-4 w-4" /> +39 348 830 7749
              </li>
              <li>Verona · Lago di Garda · Trentino</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Gestione Affitti Pro. Tutti i diritti riservati.</p>
        </div>

        <p className="mt-4 text-center text-[11px] tracking-wide text-paper/30 sm:text-right">
          Sito creato da{" "}
          <a
            href="https://andiamo-online.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-paper/50 underline decoration-paper/20 underline-offset-2 transition hover:text-gold-400 hover:decoration-gold-400/50"
          >
            AndiamOnline
          </a>
          .
        </p>
      </div>
    </footer>
  );
}
