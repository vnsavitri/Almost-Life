import type { Request, Response, NextFunction } from "express";

const WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours
const MAX_REQUESTS = 3;

const ipStore = new Map<string, number[]>();

// Prune old entries every hour to prevent memory leak
setInterval(() => {
  const cutoff = Date.now() - WINDOW_MS;
  for (const [ip, timestamps] of ipStore.entries()) {
    const fresh = timestamps.filter(t => t > cutoff);
    if (fresh.length === 0) ipStore.delete(ip);
    else ipStore.set(ip, fresh);
  }
}, 60 * 60 * 1000);

export function rateLimitGenerations(req: Request, res: Response, next: NextFunction): void {
  // Skip rate limit for demo requests — they don't call Claude
  const body = req.body as { demo?: boolean };
  if (body?.demo) { next(); return; }

  const forwarded = req.headers["x-forwarded-for"];
  const ip = (Array.isArray(forwarded) ? forwarded[0] : forwarded?.split(",")[0].trim())
    ?? req.socket.remoteAddress
    ?? "unknown";

  const now = Date.now();
  const cutoff = now - WINDOW_MS;
  const timestamps = (ipStore.get(ip) ?? []).filter(t => t > cutoff);

  if (timestamps.length >= MAX_REQUESTS) {
    const oldest = Math.min(...timestamps);
    const resetInMs = oldest + WINDOW_MS - now;
    const resetInHours = Math.ceil(resetInMs / (1000 * 60 * 60));
    res.status(429).json({
      error: "rate_limited",
      message: `You've used all ${MAX_REQUESTS} generations for today. Come back in ~${resetInHours}h.`,
      reset_in_hours: resetInHours,
    });
    return;
  }

  timestamps.push(now);
  ipStore.set(ip, timestamps);
  next();
}
