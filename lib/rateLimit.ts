import "server-only";

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 8;

// Limiter in-memory best-effort: sufficiente per una singola istanza,
// non sostituisce una protezione a livello di edge/WAF in produzione multi-istanza.
export function isRateLimited(key: string, maxAttempts = MAX_ATTEMPTS): boolean {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  bucket.count += 1;
  return bucket.count > maxAttempts;
}
