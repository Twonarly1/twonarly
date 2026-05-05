import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { match } from "ts-pattern";

import InvoiceList from "@/components/invoice-list";
import PageContainer from "@/components/layout/page-container";
import Section from "@/components/layout/section";
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
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth/auth-client";
import { capitalizeFirstLetter, formatDate } from "@/lib/utils/format";

export const Route = createLazyFileRoute("/_authenticated/billing/")({
  component: BillingPage,
});

function BillingPage() {
  const { upgraded } = Route.useSearch();
  const { subscriptions, plans } = Route.useLoaderData();
  const navigate = useNavigate();

  const [showInvoices, setShowInvoices] = useState(false);

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
    toast.success({ title: "Welcome to the Basic plan!" });
    navigate({ to: "/billing", search: {}, replace: true });
  }, [upgraded, navigate]);

  return (
    <PageContainer>
      <h1 className="items-baseline px-4 font-medium text-4xl">Billing</h1>

      <section>
        <Item variant="outline" className="rounded-xl">
          <ItemContent>
            <ItemTitle>
              {isActive ? `${capitalizeFirstLetter(subscription.plan)} plan` : "Free plan"}

              {isCanceling && <Badge>Canceling</Badge>}
            </ItemTitle>
            <ItemDescription>{planDescription}</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button
              onClick={isActive ? openBillingPortal : handleUpgrade}
              className="cursor-pointer"
            >
              {isActive ? "Manage" : "Upgrade"}
            </Button>
          </ItemActions>
        </Item>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        {plans.map((plan) => {
          const isCurrent = subscription
            ? plan.name.toLowerCase() === subscription.plan.toLowerCase()
            : plan.name === "Free";

          return (
            <Card key={plan.name}>
              <CardHeader>
                <CardTitle>{plan.name}</CardTitle>
                <CardDescription>
                  <span className="font-medium text-foreground">${plan.price}</span> /{" "}
                  {plan.interval}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <Check className="icon-xs shrink-0 text-primary" />
                    <span className="text-secondary-foreground">{feature}</span>
                  </div>
                ))}
              </CardContent>

              {!isCurrent && plan.name !== "Free" && (
                <CardFooter>
                  <Button
                    className="w-full cursor-pointer"
                    onClick={isActive ? openBillingPortal : handleUpgrade}
                  >
                    Upgrade to {plan.name}
                  </Button>
                </CardFooter>
              )}
            </Card>
          );
        })}
      </section>

      <Section title="Invoices" description="Your billing history and receipts">
        {showInvoices ? (
          <InvoiceList />
        ) : (
          <Button
            variant="outline-surface"
            onClick={() => setShowInvoices(true)}
            className="absolute top-2 right-4"
          >
            Load invoices
          </Button>
        )}
      </Section>
    </PageContainer>
  );
}
