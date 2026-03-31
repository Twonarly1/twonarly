import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

import { auth } from "@/lib/config/auth.config";
import { ensureSession } from "@/server/functions/session/ensure-session";

import type { Subscription } from "@better-auth/stripe";

export const fetchActiveSubscriptions = createServerFn({ method: "GET" }).handler(async () => {
  const session = await ensureSession();

  const subscriptions: Subscription[] = await auth.api.listActiveSubscriptions({
    headers: getRequestHeaders(),
    query: {
      referenceId: session.user.id,
      customerType: "user",
    },
  });

  return subscriptions;
});
