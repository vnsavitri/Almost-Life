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

export function getRemaining(ip: string): { used: number; remaining: number; reset_in_hours: number } {
  const now = Date.now();
  const cutoff = now - WINDOW_MS;
  const timestamps = (ipStore.get(ip) ?? []).filter(t => t > cutoff);
  const used = timestamps.length;
  const remaining = Math.max(0, MAX_REQUESTS - used);
  const oldest = timestamps.length > 0 ? Math.min(...timestamps) : now;
  const resetInMs = used >= MAX_REQUESTS ? oldest + WINDOW_MS - now : WINDOW_MS;
  const reset_in_hours = Math.ceil(resetInMs / (1000 * 60 * 60));
  return { used, remaining, reset_in_hours };
}

export function rateLimitGenerations(req: Request, res: Response, next: NextFunction): void {
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
