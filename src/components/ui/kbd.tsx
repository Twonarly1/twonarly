import type { ComponentProps } from "react";

function Kbd({ ...props }: ComponentProps<"kbd">) {
  return (
    <kbd
      data-slot="kbd"
      className="pointer-events-none ml-2 inline-flex h-4 w-fit min-w-4 select-none items-center justify-center gap-1 rounded border bg-muted custom:bg-surface font-medium font-sans text-xs [&_svg:not([class*='size-'])]:size-3"
      {...props}
    />
  );
}

function KbdGroup({ ...props }: ComponentProps<"div">) {
  return <kbd data-slot="kbd-group" className="inline-flex items-center gap-1" {...props} />;
}

export { Kbd, KbdGroup };
