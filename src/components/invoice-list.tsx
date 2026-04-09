import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { match } from "ts-pattern";

import Link from "@/components/core/link";
import { INTENT_ICONS } from "@/components/intent";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item";
import { formatDate } from "@/lib/utils/format";
import { fetchInvoices } from "@/server/functions/subscriptions/fetch-invoices";

import type { Intent } from "@/components/intent";
import type { Invoice } from "@/server/functions/subscriptions/fetch-invoices";

interface Props {
  invoices: Invoice[];
  hasMore: boolean;
}

const InvoiceList = ({ invoices: initial, hasMore: initialHasMore }: Props) => {
  const [invoices, setInvoices] = useState(initial);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [loading, setLoading] = useState(false);

  const loadMore = async () => {
    const lastId = invoices[invoices.length - 1]?.id;
    if (!lastId) return;

    setLoading(true);
    try {
      const result = await fetchInvoices({ data: { startingAfter: lastId } });
      setInvoices((prev) => [...prev, ...result.invoices]);
      setHasMore(result.hasMore);
    } finally {
      setLoading(false);
    }
  };

  if (invoices.length === 0) {
    return (
      <ItemGroup className="rounded-lg border">
        <Item>
          <ItemContent>
            <span className="text-muted-foreground">No invoices yet</span>
          </ItemContent>
        </Item>
      </ItemGroup>
    );
  }

  return (
    <ItemGroup className="rounded-lg border">
      {invoices.map((invoice) => (
        <Item key={invoice.id}>
          <ItemContent>
            <ItemTitle className="flex items-center gap-2 font-normal">
              {invoice.lines.map((line) => line.description).join(", ")}
            </ItemTitle>
            <ItemDescription>
              {formatDate(new Date(invoice.created * 1000), { year: true })}
            </ItemDescription>
          </ItemContent>

          <ItemActions>
            <span className="flex items-center gap-2 px-2">
              {
                INTENT_ICONS[
                  match(invoice.status)
                    .with("paid", () => "success" as Intent)
                    .with("uncollectible", () => "error" as Intent)
                    .with("open", "draft", "void", () => "warning" as Intent)
                    .otherwise(() => "info" as Intent)
                ]
              }
              <span className="first-letter:uppercase">{invoice.status}</span>
            </span>
            <Link
              variant="ghost"
              to={invoice.hostedInvoiceUrl || "#"}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="icon-xs" />
              View
            </Link>
          </ItemActions>
        </Item>
      ))}

      {hasMore && (
        <Item>
          <ItemContent className="items-center">
            <Button variant="ghost" size="sm" onClick={loadMore} disabled={loading}>
              {loading ? "Loading…" : "Show older invoices"}
            </Button>
          </ItemContent>
        </Item>
      )}
    </ItemGroup>
  );
};

export default InvoiceList;
