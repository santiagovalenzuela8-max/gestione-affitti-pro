import { IconMail, IconPhone } from "./icons";

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
            <p className="flex items-baseline gap-1.5">
              <span className="font-serif text-xl font-semibold">Gestione Affitti</span>
              <span className="font-serif text-xl italic text-gold-400">Pro</span>
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
                <IconPhone className="h-4 w-4" /> +39 045 123 4567
              </li>
              <li className="flex items-center gap-2">
                <IconMail className="h-4 w-4" /> info@gestioneaffittipro.it
              </li>
              <li>Verona · Lago di Garda · Trentino</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-paper/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Gestione Affitti Pro. Tutti i diritti riservati.</p>
          <p>P.IVA 00000000000</p>
        </div>
      </div>
    </footer>
  );
}
