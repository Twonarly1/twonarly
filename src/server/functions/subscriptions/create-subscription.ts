import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

import { auth } from "@/lib/config/auth.config";
import { getSession } from "@/server/functions/session/get-session";
import { getUser } from "@/server/functions/user/get-user";

export const creatSubscription = createServerFn({ method: "POST" }).handler(async () => {
  const session = await getSession();
  if (!session?.userId) throw new Error("Unauthorized");

  const user = await getUser();
  if (!user?.stripeCustomerId) throw new Error("No Stripe customer ID found");

  await auth.api.upgradeSubscription({
    headers: await getRequestHeaders(),
    body: {
      plan: "basic",
      successUrl: "/billing",
      cancelUrl: "/billing",
    },
  });
});
