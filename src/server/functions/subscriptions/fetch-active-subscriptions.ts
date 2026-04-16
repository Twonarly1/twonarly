import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

import { auth } from "@/lib/config/auth.config";

import type { Subscription } from "@better-auth/stripe";

export const fetchActiveSubscriptions = createServerFn({ method: "GET" }).handler(async () => {
  const headers = getRequestHeaders();
  const session = await auth.api.getSession({ headers });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const subscriptions: Subscription[] = await auth.api.listActiveSubscriptions({
    headers,
    query: {
      referenceId: session.user.id,
      customerType: "user",
    },
  });

  return subscriptions;
});
