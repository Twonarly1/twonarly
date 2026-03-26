import { createServerFn } from "@tanstack/react-start";

import { stripeClient } from "@/lib/config/stripe.config";
import { getUser } from "@/server/functions/user/get-user";

export const listInvoices = createServerFn({ method: "GET" })
  .inputValidator((data: { limit?: number; startingAfter?: string }) => data)
  .handler(async ({ data }) => {
    const user = await getUser();

    const result = await stripeClient.invoices.list({
      customer: user?.stripeCustomerId!,
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

export type Invoice = Awaited<ReturnType<typeof listInvoices>>["invoices"][number];
