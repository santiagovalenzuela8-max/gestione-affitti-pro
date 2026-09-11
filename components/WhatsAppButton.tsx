import { IconWhatsApp } from "./icons";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/393488307749?text=Ciao%2C%20vorrei%20una%20valutazione%20gratuita%20della%20mia%20casa%20vacanze"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Scrivici su WhatsApp"
      className="fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-ink/25 transition hover:scale-105 hover:shadow-xl lg:bottom-6 lg:right-6"
    >
      <IconWhatsApp className="h-7 w-7" />
    </a>
  );
}
