import type { ComponentProps } from "react";

function Empty(props: ComponentProps<"div">) {
  return (
    <div
      data-slot="empty"
      className="flex min-w-0 flex-1 flex-col items-center justify-center gap-6 text-balance rounded-lg border-dashed p-6 text-center md:p-12"
      {...props}
    />
  );
}

function EmptyHeader(props: ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-header"
      className="flex max-w-sm flex-col items-center gap-2 text-center"
      {...props}
    />
  );
}

function EmptyMedia(props: ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-icon"
      className="mb-2 flex size-10 shrink-0 items-center justify-center rounded-lg bg-muted text-foreground [&_svg:not([class*='size-'])]:size-6 [&_svg]:pointer-events-none [&_svg]:shrink-0"
      {...props}
    />
  );
}

function EmptyTitle(props: ComponentProps<"div">) {
  return <div data-slot="empty-title" className="font-medium text-xl tracking-tight" {...props} />;
}

function EmptyDescription(props: ComponentProps<"p">) {
  return (
    <div
      data-slot="empty-description"
      className="text-secondary-foreground [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4"
      {...props}
    />
  );
}

function EmptyContent(props: ComponentProps<"div">) {
  return (
    <div
      data-slot="empty-content"
      className="flex w-full min-w-0 max-w-sm flex-col items-center gap-4 text-balance text-sm"
      {...props}
    />
  );
}

export { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle };
