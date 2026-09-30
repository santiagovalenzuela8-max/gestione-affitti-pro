import "server-only";

// Protezione anti-bot senza servizi esterni, per i form di login: un campo
// esca invisibile (i bot spesso lo compilano) e un tempo minimo di
// compilazione (i bot inviano il form quasi istantaneamente). Da usare
// insieme al rate limiting per IP già presente in lib/rateLimit.ts.

export const HONEYPOT_FIELD = "azienda_hp";
export const TIMESTAMP_FIELD = "form_rendered_at";
const MIN_FILL_TIME_MS = 1200;

export function isLikelyBot(formData: FormData): boolean {
  const honeypot = formData.get(HONEYPOT_FIELD);
  if (typeof honeypot === "string" && honeypot.trim().length > 0) {
    return true;
  }

  const renderedAtRaw = formData.get(TIMESTAMP_FIELD);
  const renderedAt = typeof renderedAtRaw === "string" ? Number(renderedAtRaw) : NaN;
  if (!Number.isFinite(renderedAt)) {
    return true;
  }

  const elapsed = Date.now() - renderedAt;
  return elapsed < MIN_FILL_TIME_MS;
}
