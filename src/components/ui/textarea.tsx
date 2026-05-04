import type * as React from "react";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={`field-sizing-content flex min-h-16 w-full rounded-lg border border-border bg-transparent px-3 py-2 outline-none transition-colors placeholder:text-secondary-foreground focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:bg-border/30 dark:aria-invalid:ring-destructive/40 ${className}`}
      {...props}
    />
  );
}

export { Textarea };
