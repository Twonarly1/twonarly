import { useQuery } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { match } from "ts-pattern";

import Link from "@/components/core/link";
import { StatusErrorIcon } from "@/components/icons/status-error";
import { StatusInfoIcon } from "@/components/icons/status-info";
import { StatusSuccessIcon } from "@/components/icons/status-success";
import { StatusWarningIcon } from "@/components/icons/status-warning";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item";
import { Skeleton, skeletonRows } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils/format";
import { fetchInvoices } from "@/server/functions/subscriptions/fetch-invoices";

import type { Invoice } from "@/server/functions/subscriptions/fetch-invoices";

const INVOICE_LIMIT = 6;

const InvoiceList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["invoices"],
    queryFn: () => fetchInvoices({ data: { limit: INVOICE_LIMIT, startingAfter: undefined } }),
    staleTime: 1000 * 60 * 5,
  });

  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const animateFromIndex = useRef(0);
  const initialized = useRef(false);

  // Sync query data into local state for pagination
  if (data && !initialized.current) {
    initialized.current = true;
    setInvoices(data.invoices);
    setHasMore(data.hasMore);
  }

  const loadMore = async () => {
    const lastId = invoices[invoices.length - 1]?.id;
    if (!lastId) return;

    setLoadingMore(true);
    try {
      const result = await fetchInvoices({
        data: { startingAfter: lastId, limit: INVOICE_LIMIT },
      });
      animateFromIndex.current = invoices.length;
      setInvoices((prev) => [...prev, ...result.invoices]);
      setHasMore(result.hasMore);
    } finally {
      setLoadingMore(false);
    }
  };

  if (isLoading)
    return (
      <ItemGroup variant="list">
        {skeletonRows(4).map((i) => (
          <Item key={i}>
            <ItemContent>
              <div className="flex items-center gap-2">
                <div className="flex w-6 sm:hidden">
                  <Skeleton className="size-4 rounded-full" />
                </div>
                <div className="space-y-1">
                  <Skeleton className="h-4 w-48" />
                  <Skeleton className="h-3.5 w-28" />
                </div>
              </div>
            </ItemContent>
            <ItemActions className="space-x-2">
              <span className="hidden items-center gap-2 sm:flex">
                <Skeleton className="size-4 rounded-full" />
                <Skeleton className="h-4 w-12" />
              </span>
              <Skeleton className="h-6 w-14" />
            </ItemActions>
          </Item>
        ))}
      </ItemGroup>
    );

  if (invoices.length === 0)
    return <span className="px-4 text-muted-foreground">No invoices yet</span>;

  return (
    <ItemGroup variant="list">
      {invoices.map((invoice) => {
        return (
          <Item key={invoice.id}>
            <ItemContent>
              <div className="flex items-center gap-2">
                <div className="flex w-6 sm:hidden">
                  {match(invoice.status)
                    .with("paid", () => <StatusSuccessIcon className="icon-sm" />)
                    .with("uncollectible", () => <StatusErrorIcon className="icon-sm" />)
                    .with("open", "draft", "void", () => <StatusWarningIcon className="icon-sm" />)
                    .otherwise(() => (
                      <StatusInfoIcon className="icon-sm" />
                    ))}
                </div>

                <div className="space-y-1">
                  <ItemTitle className="flex items-center gap-2 font-normal">
                    {invoice.lines.map((line) => line.description).join(", ")}
                  </ItemTitle>
                  <ItemDescription>
                    {formatDate(new Date(invoice.created * 1000), { year: true })}
                  </ItemDescription>
                </div>
              </div>
            </ItemContent>

            <ItemActions className="space-x-2">
              <span className="hidden items-center gap-2 sm:flex">
                {match(invoice.status)
                  .with("paid", () => <StatusSuccessIcon className="icon-sm" />)
                  .with("uncollectible", () => <StatusErrorIcon className="icon-sm" />)
                  .with("open", "draft", "void", () => <StatusWarningIcon className="icon-sm" />)
                  .otherwise(() => (
                    <StatusInfoIcon className="icon-sm" />
                  ))}
                <span className="first-letter:uppercase">{invoice.status}</span>
              </span>

              <Link
                variant="ghost"
                to={invoice.hostedInvoiceUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden cursor-pointer sm:flex"
              >
                View &#8599;
              </Link>
            </ItemActions>
          </Item>
        );
      })}

      {hasMore && (
        <Item>
          <ItemContent className="items-center">
            <Button variant="ghost" onClick={loadMore} disabled={loadingMore}>
              {loadingMore ? "Loading…" : "Show past invoices"}
            </Button>
          </ItemContent>
        </Item>
      )}
    </ItemGroup>
  );
};

export default InvoiceList;
