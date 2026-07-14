import { IconPhone } from "./icons";

export function MobileCTABar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex items-stretch border-t border-gold-500/30 bg-noir pb-[env(safe-area-inset-bottom)] lg:hidden">
      <a
        href="tel:+390451234567"
        className="flex items-center justify-center gap-2 border-r border-white/10 px-5 py-3.5 text-sm font-semibold text-paper"
        aria-label="Chiama Gestione Affitti Pro"
      >
        <IconPhone className="h-4.5 w-4.5 text-cyan-400" />
      </a>
      <a
        href="#contatti"
        className="flex flex-1 items-center justify-center gap-2 bg-ink px-5 py-3.5 text-sm font-semibold uppercase tracking-wider text-paper"
      >
        Valutazione gratuita
      </a>
    </div>
  );
}
