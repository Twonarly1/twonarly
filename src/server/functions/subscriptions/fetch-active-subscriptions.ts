import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

import { auth } from "@/lib/config/auth.config";
import { getSession } from "@/server/functions/session/get-session";

import type { Subscription } from "@better-auth/stripe";

export const fetchActiveSubscriptions = createServerFn({ method: "GET" }).handler(async () => {
  const session = await getSession();
  if (!session?.userId) throw new Error("Unauthorized");

  const subscriptions: Subscription[] = await auth.api.listActiveSubscriptions({
    headers: getRequestHeaders(),
    query: {
      referenceId: session.userId,
      customerType: "user",
    },
  });

  return subscriptions;
});
