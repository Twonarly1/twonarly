import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import {
  integer,
  maxValue,
  minValue,
  number,
  object,
  optional,
  pipe,
  regex,
  string,
} from "valibot";

import { auth } from "@/lib/auth/auth.config";
import { stripeClient } from "@/lib/config/stripe.config";

const fetchInvoicesInput = object({
  limit: optional(pipe(number(), integer(), minValue(1), maxValue(100))),
  startingAfter: optional(pipe(string(), regex(/^in_[A-Za-z0-9]+$/, "Invalid cursor"))),
});

export const getInvoices = createServerFn({ method: "GET" })
  .inputValidator(fetchInvoicesInput)
  .handler(async ({ data }) => {
    const session = await auth.api.getSession({ headers: getRequestHeaders() });

    if (!session) {
      throw new Error("Unauthorized");
    }

    const stripeCustomerId = session.user?.stripeCustomerId;

    if (!stripeCustomerId) {
      return { invoices: [], hasMore: false };
    }

    const result = await stripeClient.invoices.list({
      customer: stripeCustomerId,
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

export type Invoice = Awaited<ReturnType<typeof getInvoices>>["invoices"][number];
