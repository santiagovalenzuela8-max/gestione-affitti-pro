"use client";

import { useState } from "react";
import { IconClose, IconMenu } from "./icons";

const links = [
  { href: "#servizi", label: "Servizi" },
  { href: "#come-funziona", label: "Come funziona" },
  { href: "#zone", label: "Zone servite" },
  { href: "#risultati", label: "Risultati" },
  { href: "#contatti", label: "Contatti" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-paper-line/80 bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:py-5">
        <a href="#top" className="flex items-baseline gap-1.5">
          <span className="font-serif text-lg font-semibold tracking-tight text-ink lg:text-xl">
            Gestione Affitti
          </span>
          <span className="font-serif text-lg italic text-gold-600 lg:text-xl">Pro</span>
        </a>

        <nav className="hidden items-center gap-10 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] font-medium uppercase tracking-wider text-ink-soft transition hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:block">
          <a
            href="#contatti"
            className="rounded-full bg-ink px-6 py-2.5 text-[13px] font-semibold uppercase tracking-wider text-paper transition hover:bg-noir-soft"
          >
            Valutazione gratuita
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 text-ink lg:hidden"
          aria-label={open ? "Chiudi menu" : "Apri menu"}
        >
          {open ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-paper-line bg-paper px-6 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col gap-1">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-2 py-3 text-base font-medium text-ink-soft hover:bg-paper-dim hover:text-ink"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contatti"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-ink px-5 py-3.5 text-center text-sm font-semibold uppercase tracking-wider text-paper"
            >
              Valutazione gratuita
            </a>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
