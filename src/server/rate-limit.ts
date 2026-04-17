import { createMiddleware } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { RateLimiterMemory } from "rate-limiter-flexible";

function getClientIp(): string {
  return (
    getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ||
    getRequestHeader("x-real-ip") ||
    "unknown"
  );
}

/**
 * Rate limit middleware for TanStack Start server functions.
 *
 * Uses `rate-limiter-flexible` with an in-memory store.
 *
 * Usage:
 *   createServerFn({ method: "POST" })
 *     .middleware([rateLimit({ key: "upload-avatar", limit: 5, window: 60 })])
 *     .handler(async () => { ... })
 */
export const rateLimit = ({
  key,
  limit,
  window: windowSec,
}: {
  /** Unique key prefix for this endpoint */
  key: string;
  /** Max requests allowed in the window */
  limit: number;
  /** Window duration in seconds */
  window: number;
}) => {
  const limiter = new RateLimiterMemory({
    keyPrefix: key,
    points: limit,
    duration: windowSec,
  });

  return createMiddleware().server(async ({ next }) => {
    const ip = getClientIp();

    try {
      await limiter.consume(ip);
    } catch {
      throw new Error("Too many requests. Please try again later.");
    }

    return next();
  });
};
