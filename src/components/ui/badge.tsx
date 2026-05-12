import { cn } from "@/lib/utils";

import type { ComponentProps } from "react";

function Badge({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      data-slot="badge"
      className={cn("bg-primary text-primary-foreground", className)}
      {...props}
    />
  );
}

export { Badge };
