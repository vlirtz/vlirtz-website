/**
 * Fixed-window in-memory rate limiter for the public chat endpoint.
 *
 * The widget is unauthenticated and every request costs money, so an abusive
 * client needs a cheap backstop. This is per-instance rather than distributed:
 * good enough for a marketing site on a single region, and it fails open if the
 * map is somehow unavailable. Move to Redis or Vercel KV before scaling out.
 */

/** Requests allowed per window, per client. */
const MAX_REQUESTS = 20;

/** Window length in milliseconds. */
const WINDOW_MS = 60_000;

/** Entries older than this are pruned to stop unbounded growth. */
const PRUNE_AFTER_MS = WINDOW_MS * 5;

type Window = { count: number; resetAt: number };

const windows = new Map<string, Window>();
let lastPrune = Date.now();

/** Drops stale windows so the map cannot grow without bound. */
function prune(now: number): void {
  if (now - lastPrune < PRUNE_AFTER_MS) return;

  for (const [key, window] of windows) {
    if (window.resetAt < now) windows.delete(key);
  }
  lastPrune = now;
}

/**
 * Derives a client key from proxy headers, falling back to a shared bucket.
 */
export function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim();
  return ip || request.headers.get("x-real-ip") || "unknown";
}

export type RateLimitResult = {
  allowed: boolean;
  /** Seconds until the window resets, for the `Retry-After` header. */
  retryAfter: number;
};

/**
 * Records a request and reports whether it may proceed.
 */
export function checkRateLimit(key: string): RateLimitResult {
  const now = Date.now();
  prune(now);

  const existing = windows.get(key);

  if (!existing || existing.resetAt < now) {
    windows.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, retryAfter: 0 };
  }

  existing.count += 1;

  if (existing.count > MAX_REQUESTS) {
    return {
      allowed: false,
      retryAfter: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  return { allowed: true, retryAfter: 0 };
}
