import { createMiddleware } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";

function getClientIp(): string {
  return (
    getRequestHeader("x-forwarded-for")?.split(",")[0]?.trim() ||
    getRequestHeader("x-real-ip") ||
    "unknown"
  );
}

const stores = new Map<string, Map<string, { count: number; expires: number }>>();

export const rateLimit = ({
  key,
  limit,
  window: windowSec,
}: {
  key: string;
  limit: number;
  window: number;
}) => {
  if (!stores.has(key)) stores.set(key, new Map());
  const store = stores.get(key)!;

  return createMiddleware().server(async ({ next }) => {
    const ip = getClientIp();
    const now = Date.now();
    const entry = store.get(ip);

    if (!entry || now > entry.expires) {
      store.set(ip, { count: 1, expires: now + windowSec * 1000 });
    } else if (entry.count < limit) {
      entry.count++;
    } else {
      throw new Error("Too many requests. Please try again later.");
    }

    return next();
  });
};
