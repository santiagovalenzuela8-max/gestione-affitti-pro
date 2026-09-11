"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  IconArrowRight,
  IconClose,
  IconMenu,
  IconPhone,
  IconWhatsApp,
} from "./icons";
import { Logo } from "./Logo";

const links = [
  { href: "/", label: "Home" },
  { href: "/servizi", label: "Servizi" },
  { href: "/come-funziona", label: "Come funziona" },
  { href: "/#zone", label: "Zone servite" },
  { href: "/#risultati", label: "Risultati" },
  { href: "/contatti", label: "Contatti" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [lastPathname, setLastPathname] = useState(pathname);

  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    if (href.startsWith("/#")) return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <>
      <header className="sticky top-0 z-[60] border-b border-paper-line/80 bg-paper/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 lg:py-5">
          <Link href="/" className="flex items-center gap-2.5">
            <Logo className="h-8 w-8" />
            <span className="flex items-baseline gap-1.5">
              <span className="font-serif text-lg font-semibold tracking-tight text-ink lg:text-xl">
                Gestione Affitti
              </span>
              <span className="font-serif text-lg italic text-gold-600 lg:text-xl">
                Pro
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-[13px] font-medium uppercase tracking-wider transition ${
                  isActive(link.href)
                    ? "text-ink"
                    : "text-ink-soft hover:text-ink"
                }`}
              >
                {link.label}
                {isActive(link.href) ? (
                  <span className="absolute -bottom-1.5 left-0 h-px w-full bg-gold-500" />
                ) : null}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              href="/contatti"
              className="rounded-full bg-ink px-6 py-2.5 text-[13px] font-semibold uppercase tracking-wider text-paper transition hover:bg-noir-soft"
            >
              Valutazione gratuita
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="relative z-[70] rounded-md p-2 text-ink lg:hidden"
            aria-label={open ? "Chiudi menu" : "Apri menu"}
            aria-expanded={open}
          >
            {open ? (
              <IconClose className="h-6 w-6" />
            ) : (
              <IconMenu className="h-6 w-6" />
            )}
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[55] bg-noir text-paper transition-opacity duration-300 lg:hidden ${
          open
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col px-6 pb-[env(safe-area-inset-bottom)] pt-24">
          <nav className="flex flex-col">
            {links.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center justify-between border-b border-white/10 py-4 font-serif text-2xl transition ${
                  isActive(link.href) ? "text-gold-400" : "text-paper"
                } ${open ? "animate-fade-up" : ""}`}
                style={
                  open ? { animationDelay: `${80 + index * 60}ms` } : undefined
                }
              >
                {link.label}
                <span className="font-sans text-xs text-paper/40">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </Link>
            ))}
          </nav>

          <div
            className={`mt-auto flex flex-col gap-3 pb-8 pt-8 ${open ? "animate-fade-up" : ""}`}
            style={open ? { animationDelay: "440ms" } : undefined}
          >
            <Link
              href="/contatti"
              className="flex items-center justify-center gap-2 rounded-full bg-paper px-6 py-3.5 text-base font-semibold text-ink"
            >
              Valutazione gratuita
              <IconArrowRight className="h-4.5 w-4.5" />
            </Link>
            <div className="flex items-center justify-center gap-6 pt-2 text-sm text-paper/70">
              <a
                href="tel:+393488307749"
                className="flex items-center gap-2 hover:text-paper"
              >
                <IconPhone className="h-4 w-4 text-gold-400" />
                Chiama
              </a>
              <a
                href="https://wa.me/393488307749"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-paper"
              >
                <IconWhatsApp className="h-4 w-4 text-[#25D366]" />
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
