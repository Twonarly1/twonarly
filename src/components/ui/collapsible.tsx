import { cn } from "@/lib/utils";

import type { ComponentProps } from "react";

/**
 * Collapsible component using `interpolate-size: allow-keywords`
 * to animate height from 0 to auto — the same technique Linear uses.
 *
 * Supported in Chrome/Edge 129+, ~70% of users.
 * Degrades to an instant snap in Firefox/Safari — no layout breakage.
 */
function Collapsible({
  open,
  className,
  children,
  ...props
}: ComponentProps<"div"> & { open: boolean }) {
  return (
    <div
      data-slot="collapsible"
      data-open={open}
      className={cn(
        "overflow-hidden transition-[height,opacity] duration-200",
        "ease-out-strong",
        "[interpolate-size:allow-keywords]",
        open ? "h-auto opacity-100" : "h-0 opacity-0",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Collapsible };
