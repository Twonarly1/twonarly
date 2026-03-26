import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";

import InvoiceList from "@/components/invoice-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth/auth-client";
import { capitalizeFirstLetter, formatDate } from "@/lib/utils";
import { listActiveSubscriptions } from "@/server/functions/subscriptions/list-active-subscriptions";
import { listInvoices } from "@/server/functions/subscriptions/list-invoices";

export const Route = createFileRoute("/_authenticated/billing/")({
  component: BillingPage,
  loader: async () => {
    const [subscriptions, invoices] = await Promise.all([
      listActiveSubscriptions(),
      listInvoices({ data: { limit: 6, startingAfter: undefined } }),
    ]);

    return { subscriptions, invoices };
  },
});

function BillingPage() {
  const { invoices, subscriptions } = Route.useLoaderData();

  const subscription = subscriptions?.find(
    (sub) => sub.status === "active" || sub.status === "trialing",
  );

  return (
    <div className="container mx-auto space-y-6 p-4 sm:space-y-12">
      <div className="space-y-1">
        <h1 className="items-baseline font-medium text-h1">Billing</h1>
        <p className="text-muted-foreground text-sm">Manage your subscription and billing</p>
      </div>

      {/* Current plan */}
      <ItemGroup className="rounded-lg border">
        <Item size="sm">
          <ItemContent>
            <ItemTitle className="flex items-center gap-2">
              {subscription ? (
                <>
                  {capitalizeFirstLetter(subscription.plan)} plan
                  <Badge variant="outline-primary" className="text-body-xs">
                    Current
                  </Badge>
                  {subscription.cancelAtPeriodEnd && <Badge variant="outline">Canceling</Badge>}
                </>
              ) : (
                <>
                  Free plan
                  <Badge variant="outline-primary" className="text-body-xs">
                    Current
                  </Badge>
                </>
              )}
            </ItemTitle>
            <ItemDescription>
              {subscription
                ? subscription.status === "trialing"
                  ? `Free trial · Ends ${formatDate(subscription.trialEnd)}`
                  : subscription.cancelAtPeriodEnd
                    ? `Cancels ${formatDate(subscription.periodEnd, { year: true })}`
                    : `Renews ${formatDate(subscription.periodEnd, { year: true })}`
                : "Free for all users"}
            </ItemDescription>
          </ItemContent>

          {subscription && (
            <ItemActions>
              <Button
                variant="outline"
                size="sm"
                onClick={async () => {
                  await authClient.subscription.billingPortal({
                    returnUrl: "/billing",
                  });
                }}
              >
                Manage subscription
              </Button>
            </ItemActions>
          )}
        </Item>

        {subscription && (
          <>
            <Separator />

            <Item size="sm">
              <ItemContent>
                <ItemTitle>Billing period</ItemTitle>
              </ItemContent>
              <ItemActions>
                {formatDate(subscription.periodStart)} &ndash;{" "}
                {formatDate(subscription.periodEnd, { year: true })}
              </ItemActions>
            </Item>
          </>
        )}
      </ItemGroup>

      {/* Upgrade card — only show when not subscribed */}
      {!subscription && (
        <ItemGroup className="rounded-lg border">
          <Item size="sm">
            <ItemContent>
              <ItemTitle>Upgrade to Basic</ItemTitle>
              <ItemDescription>$5 per month</ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button
                size="sm"
                onClick={async () => {
                  const { error } = await authClient.subscription.upgrade({
                    plan: "basic",
                    successUrl: "/billing",
                    cancelUrl: "/billing",
                  });
                  if (error) {
                    // handle error — use your toast
                    toast.error({
                      title: "Upgrade failed. Please try again.",
                    });
                  }
                }}
              >
                Upgrade now
              </Button>
            </ItemActions>
          </Item>
          <Separator />
          <div className="flex flex-wrap gap-x-6 gap-y-2 px-4 py-3">
            {["GitHub Integration"].map((feature) => (
              <div key={feature} className="flex items-center gap-1.5">
                <Check className="icon-xs text-primary" />
                <span className="text-muted-foreground">{feature}</span>
              </div>
            ))}
          </div>
        </ItemGroup>
      )}

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
