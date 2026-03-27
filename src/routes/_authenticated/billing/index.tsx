import { createFileRoute, useNavigate } from "@tanstack/react-router";
import confetti from "canvas-confetti";
import { Check } from "lucide-react";
import { useEffect } from "react";
import { match } from "ts-pattern";
import { z } from "zod";

import InvoiceList from "@/components/invoice-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth/auth-client";
import { capitalizeFirstLetter, cn, formatDate } from "@/lib/utils";
import { fetchActiveSubscriptions } from "@/server/functions/subscriptions/fetch-active-subscriptions";
import { fetchInvoices } from "@/server/functions/subscriptions/fetch-invoices";
import { fetchPlans } from "@/server/functions/subscriptions/fetch-plans";

export const Route = createFileRoute("/_authenticated/billing/")({
  component: BillingPage,
  validateSearch: z.object({
    upgraded: z.boolean().optional(),
  }),
  loader: async () => {
    const subscriptions = await fetchActiveSubscriptions();
    const invoices = await fetchInvoices({ data: { limit: 6, startingAfter: undefined } });
    const plans = await fetchPlans();

    return { subscriptions, invoices, plans };
  },
});

function BillingPage() {
  const { upgraded } = Route.useSearch();
  const { invoices, subscriptions, plans } = Route.useLoaderData();
  const navigate = useNavigate();

  const subscription = subscriptions?.find(
    (sub) => sub.status === "active" || sub.status === "trialing",
  );

  const isActive = !!subscription;
  const isTrialing = subscription?.status === "trialing";
  const isCanceling = !!(subscription?.cancelAtPeriodEnd || subscription?.cancelAt);

  const cancellationDate = subscription?.cancelAt ?? subscription?.periodEnd;

  const openBillingPortal = () => authClient.subscription.billingPortal({ returnUrl: "/billing" });

  const handleUpgrade = async () => {
    const { error } = await authClient.subscription.upgrade({
      plan: "basic",
      successUrl: "/billing?upgraded=true",
      cancelUrl: "/billing",
    });

    if (error) {
      toast.error({ title: "Upgrade failed. Please try again." });
    }
  };

  const planDescription = match({ isActive, isTrialing, isCanceling })
    .with({ isActive: false }, () => "Upgrade to unlock integrations and more")
    .with({ isTrialing: true }, () => `Free trial · Ends ${formatDate(subscription?.trialEnd)}`)
    .with(
      { isCanceling: true },
      () =>
        `Active until ${formatDate(cancellationDate, { year: true })}. You won't be charged again.`,
    )
    .otherwise(() => `Next payment on ${formatDate(subscription?.periodEnd, { year: true })}`);

  useEffect(() => {
    if (!upgraded) return;

    const duration = 2000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 90,
        spread: 160,
        origin: { x: Math.random(), y: -0.1 },
        colors: [
          "hsl(var(--primary))",
          "hsl(var(--accent))",
          "hsl(var(--muted))",
          "hsl(var(--secondary))",
        ],
        ticks: 400,
        gravity: 0.6,
        decay: 0.97,
        startVelocity: 5,
        shapes: ["circle"],
        scalar: 1.1,
        drift: Math.random() - 0.5,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      } else {
        navigate({ to: "/billing", search: {}, replace: true });
      }
    };

    frame();
  }, [upgraded, navigate]);

  return (
    <div className="container mx-auto space-y-6 p-4 sm:space-y-12">
      <div className="space-y-1">
        <h1 className="items-baseline font-medium text-h1">Billing</h1>
        <p className="text-muted-foreground text-sm">Manage your subscription and billing</p>
      </div>

      <ItemGroup className="rounded-lg border">
        <Item size="sm">
          <ItemContent>
            <ItemTitle className="flex items-center gap-2">
              {isActive ? `${capitalizeFirstLetter(subscription.plan)} plan` : "Free plan"}

              {isCanceling && (
                <Badge variant="outline" className="text-body-xs">
                  Canceling
                </Badge>
              )}
            </ItemTitle>
            <ItemDescription>{planDescription}</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button size="sm" onClick={isActive ? openBillingPortal : handleUpgrade}>
              {isActive ? "Manage" : "Upgrade"}
            </Button>
          </ItemActions>
        </Item>
      </ItemGroup>
      <div className="grid gap-4 sm:grid-cols-2">
        {plans.map((plan) => {
          const isCurrent = subscription
            ? plan.name.toLowerCase() === subscription.plan.toLowerCase()
            : plan.name === "Free";

          return (
            <Card key={plan.name} className={cn("", isCurrent && "border-primary")}>
              <CardHeader className="mb-3">
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>
                  <span className="font-medium text-foreground">${plan.price}</span> /{" "}
                  {plan.interval}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-1.5 border-t py-3">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="icon-xs shrink-0 text-primary" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </CardContent>

              {!isCurrent && plan.name !== "Free" && (
                <CardFooter>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={isActive ? openBillingPortal : handleUpgrade}
                  >
                    Upgrade to {plan.name}
                  </Button>
                </CardFooter>
              )}
            </Card>
          );
        })}
      </div>
      <div className="space-y-4">
        <Item className="px-0">
          <ItemContent>
            <ItemTitle>Recent invoices</ItemTitle>
          </ItemContent>
        </Item>

        <InvoiceList invoices={invoices.invoices} hasMore={invoices.hasMore} />
      </div>
    </div>
  );
}
