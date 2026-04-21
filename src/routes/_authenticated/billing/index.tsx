import { createFileRoute } from "@tanstack/react-router";
import { boolean, object, optional } from "valibot";

import { fetchActiveSubscriptions } from "@/server/functions/subscriptions/fetch-active-subscriptions";
import { fetchPlans } from "@/server/functions/subscriptions/fetch-plans";

export const Route = createFileRoute("/_authenticated/billing/")({
  validateSearch: object({
    upgraded: optional(boolean()),
  }),
  loader: async () => {
    const [subscriptions, plans] = await Promise.all([fetchActiveSubscriptions(), fetchPlans()]);

    return { subscriptions, plans };
  },
});
