import { createServerFn } from "@tanstack/react-start";

import { stripeClient } from "@/lib/config/stripe.config";
import { fetchUser } from "@/server/functions/user/fetch-user";

export const fetchInvoices = createServerFn({ method: "GET" })
  .inputValidator((data: { limit?: number; startingAfter?: string }) => data)
  .handler(async ({ data }) => {
    const user = await fetchUser();

    if (!user?.stripeCustomerId) {
      return { invoices: [], hasMore: false };
    }

    const result = await stripeClient.invoices.list({
      customer: user.stripeCustomerId,
      limit: data?.limit ?? 12,
      ...(data?.startingAfter && { starting_after: data.startingAfter }),
    });

    return {
      invoices: result.data.map((inv) => ({
        id: inv.id,
        status: inv.status,
        amountPaid: inv.amount_paid,
        currency: inv.currency,
        created: inv.created,
        number: inv.number,
        hostedInvoiceUrl: inv.hosted_invoice_url,
        lines: inv.lines.data.map((line) => ({
          id: line.id,
          description: line.description,
        })),
      })),
      hasMore: result.has_more,
    };
  });

export type Invoice = Awaited<ReturnType<typeof fetchInvoices>>["invoices"][number];
