import type * as React from "react";

function Card(props: React.ComponentProps<"div">) {
  return <div data-slot="card" className="flex flex-col rounded-xl border bg-surface" {...props} />;
}

function CardHeader(props: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className="@container/card-header mb-3 grid auto-rows-min grid-rows-[auto_auto] items-start gap-1 px-4 pt-3 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-3"
      {...props}
    />
  );
}

function CardTitle(props: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className="flex w-fit items-center gap-2 font-medium text-base text-foreground leading-snug"
      {...props}
    />
  );
}

function CardDescription(props: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className="line-clamp-2 text-balance font-normal text-secondary-foreground text-sm leading-normal [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4"
      {...props}
    />
  );
}

function CardAction(props: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className="col-start-2 row-span-2 row-start-1 self-start justify-self-end"
      {...props}
    />
  );
}

function CardContent(props: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className="flex flex-col gap-1.5 px-4 pb-4" {...props} />;
}

function CardFooter(props: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className="flex items-center px-4 pb-3 [.border-t]:pt-3"
      {...props}
    />
  );
}

export { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle };
