import { useQuery } from "@tanstack/react-query";
import { Fragment, useRef, useState } from "react";
import { match } from "ts-pattern";

import Link from "@/components/core/link";
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
import { StatusErrorIcon } from "./icons/status-error";
import { StatusInfoIcon } from "./icons/status-info";
import { StatusSuccessIcon } from "./icons/status-success";
import { StatusWarningIcon } from "./icons/status-warning";
import { Skeleton } from "./ui/skeleton";

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
      <ItemGroup className="divide-none">
        {Array.from({ length: 4 }).map((_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: Okay
          <Fragment key={i}>
            <Item>
              <Skeleton className="flex size-4 sm:hidden" />
              <ItemContent>
                <Skeleton className="h-4 w-48" />
                <Skeleton className="h-3.5 w-28" />
              </ItemContent>
              <ItemActions className="hidden sm:flex">
                <Skeleton className="h-6 w-16" />
                <Skeleton className="h-6 w-16" />
              </ItemActions>
            </Item>
          </Fragment>
        ))}
      </ItemGroup>
    );

  if (invoices.length === 0)
    return (
      <ItemGroup className="divide-none">
        <Item>
          <ItemContent>
            <span className="text-muted-foreground">No invoices yet</span>
          </ItemContent>
        </Item>
      </ItemGroup>
    );

  return (
    <ItemGroup className="sm:divide-none">
      {invoices.map((invoice, i) => {
        const shouldAnimate = i >= animateFromIndex.current;

        return (
          <Item
            key={invoice.id}
            className={shouldAnimate ? "stagger" : undefined}
            style={
              shouldAnimate
                ? {
                    opacity: 0,
                    transform: "translateY(8px)",
                    animation: "fadeIn 300ms var(--ease-out-strong) forwards",
                    animationDelay: `${(i - animateFromIndex.current) * 80}ms`,
                  }
                : undefined
            }
          >
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

                <div className="flex flex-col gap-1">
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
              >
                &#8599;
                <span className="hidden sm:flex">View</span>
              </Link>
            </ItemActions>
          </Item>
        );
      })}

      {hasMore && (
        <Item>
          <ItemContent className="items-center">
            <Button variant="ghost" size="sm" onClick={loadMore} disabled={loadingMore}>
              {loadingMore ? "Loading…" : "Show past invoices"}
            </Button>
          </ItemContent>
        </Item>
      )}
    </ItemGroup>
  );
};

export default InvoiceList;
