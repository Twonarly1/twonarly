import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Slot } from "@/lib/utils/slot";

import type { VariantProps } from "class-variance-authority";
import type * as React from "react";

const buttonVariants = cva(
  "focus-visible:border-primary focus-visible:border aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-lg border border-transparent bg-clip-padding aria-invalid:ring-[3px] inline-flex items-center justify-center whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary border-0 focus-visible:border-0 text-primary-foreground hover:bg-primary/80 focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        outline:
          "border-border bg-surface text-secondary-foreground hover:bg-content hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        ghost:
          "text-secondary-foreground hover:bg-content hover:text-foreground  aria-expanded:bg-muted aria-expanded:text-foreground",
        destructive:
          "hover:bg-destructive/10 focus-visible:ring-destructive/10 bg-surface text-destructive focus-visible:border-destructive/50",
        "destructive-fill":
          "bg-destructive border-0 focus-visible:border-0 text-destructive-foreground hover:bg-destructive/80 focus-visible:ring focus-visible:ring-destructive focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        link: "underline-offset-4 hover:underline",
        sidebar:
          "transition-none group-data-[collapsible=icon]:[&>span]:hidden px-2.25! group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 [&>span:last-child]:truncate overflow-hidden justify-start peer/menu-button group/menu-button group/button text-sm select-none hover:bg-sidebar-accent/60 text-sidebar-foreground font-medium leading-snug w-full",
        unstyled: "",
      },
      size: {
        sm: "h-7 gap-1 px-2.5",
        lg: "h-9 gap-1.5",
        icon: "size-8",
        "icon-xs": "size-6",
        "icon-sm": "size-7",
        "icon-lg": "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  },
);

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
