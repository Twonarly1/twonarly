import clsx from "clsx";

import type * as React from "react";

function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="badge"
      className={clsx("bg-primary text-primary-foreground", className)}
      {...props}
    />
  );
}

export { Badge };
