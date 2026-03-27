import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

import { auth } from "@/lib/config/auth.config";
import { getSession } from "@/server/functions/session/get-session";

export const cancelSubscription = createServerFn({ method: "POST" })
  .inputValidator((data: { subscriptionId: string }) => data)
  .handler(async ({ data }) => {
    const session = await getSession();
    if (!session?.userId) throw new Error("Unauthorized");

    await auth.api.cancelSubscription({
      headers: await getRequestHeaders(),
      body: {
        referenceId: session.userId,
        customerType: "user",
        subscriptionId: data.subscriptionId,
        returnUrl: "/billing",
      },
    });
  });
