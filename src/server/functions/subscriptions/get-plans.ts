import { createServerFn } from "@tanstack/react-start";

import { stripeClient } from "@/lib/config/stripe.config";

import type Stripe from "stripe";

const FREE_PLAN = {
  id: "free",
  name: "Free",
  price: 0,
  interval: "month" as const,
  features: ["Unlimited tasks", "Custom themes"],
};

export const getPlans = createServerFn({ method: "GET" }).handler(async () => {
  const prices = await stripeClient.prices.list({
    active: true,
    expand: ["data.product"],
    type: "recurring",
  });

  const paidPlans = prices.data.map((price) => {
    const product = price.product as Stripe.Product;

    return {
      id: price.id,
      name: product.name,
      description: product.description,
      price: price.unit_amount ? price.unit_amount / 100 : 0,
      interval: price.recurring?.interval,
      features: product.marketing_features?.map((f) => f.name) ?? [],
    };
  });

  return [FREE_PLAN, ...paidPlans];
});
