import Link from "next/link";
import { IconArrowRight } from "./icons";

export function PageHeader({
  eyebrow,
  title,
  description,
  showCta = true,
}: {
  eyebrow: string;
  title: string;
  description: string;
  showCta?: boolean;
}) {
  return (
    <section className="border-b border-paper-line bg-paper-dim">
      <div className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-ink-soft">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{title}</span>
        </nav>

        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold-600">{eyebrow}</p>
        <h1 className="mt-4 max-w-2xl font-serif text-4xl leading-[1.1] text-ink text-balance sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">{description}</p>

        {showCta ? (
          <Link
            href="/contatti"
            className="group mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3.5 text-base font-semibold text-paper shadow-lg shadow-ink/15 transition hover:bg-noir-soft hover:-translate-y-0.5"
          >
            Richiedi una valutazione gratuita
            <IconArrowRight className="h-4.5 w-4.5 transition group-hover:translate-x-0.5" />
          </Link>
        ) : null}
      </div>
    </section>
  );
}
