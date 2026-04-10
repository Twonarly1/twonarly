import { cn } from "@/lib/utils";

import type * as React from "react";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 cursor-auto rounded-lg border border-input bg-transparent px-3 py-1 font-normal text-body text-body text-foreground shadow-xs outline-none",
        "transition-colors selection:bg-primary selection:text-primary-foreground file:inline-flex file:h-7 file:border-0",
        "md: disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30",
        "file: placeholder: placeholder:text-muted-foreground",
        "file:bg-transparent file:font-medium file:text-foreground focus-visible:border-primary",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
