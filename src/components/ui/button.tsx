import { cva } from "class-variance-authority";
import clsx from "clsx";

import type { VariantProps } from "class-variance-authority";
import type * as React from "react";

const buttonVariants = cva(
  "focus-visible:border-primary border focus-visible:border aria-invalid:ring-destructive/20 transition-none dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:aria-invalid:border-destructive/50 rounded-lg  bg-clip-padding aria-invalid:ring-[3px] inline-flex items-center whitespace-nowrap disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none group/button select-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary border-0 focus-visible:border-0 text-primary-foreground hover:bg-primary/80 focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        outline:
          "border-border bg-transparent hover:bg-muted custom:hover:bg-content text-secondary-foreground hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        "outline-surface":
          "border-border bg-transparent hover:bg-muted custom:hover:bg-surface text-secondary-foreground hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        ghost:
          "border-transparent border text-secondary-foreground hover:bg-muted custom:hover:bg-content hover:text-foreground aria-expanded:bg-muted custom:aria-expanded:bg-content aria-expanded:text-foreground",
        destructive:
          "border border-transparent hover:bg-destructive/10 focus-visible:ring-destructive/10 bg-surface text-destructive focus-visible:border-destructive/50",
        "destructive-fill":
          "bg-destructive border-0 focus-visible:border-0 text-destructive-foreground hover:bg-destructive/80 focus-visible:ring focus-visible:ring-destructive focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        mobileNav:
          "rounded-full transition-colors duration-150 hover:bg-muted ease-out-strong custom:hover:bg-surface aria-expanded:bg-muted aria-expanded:custom:bg-surface aria-expanded:text-foreground",
      },
      size: {
        sm: "h-7 gap-2 px-2.5 py-0.5",
        md: "h-8 gap-2 px-2.5",
        lg: "h-9 gap-2 px-2.5",
        xl: "h-10 gap-2 px-2.5",
        icon: "size-8",
        "icon-xs": "size-6",
        "icon-sm": "size-7",
        "icon-lg": "size-9",
      },
      press: {
        scale: "active:scale-[0.97]",
        none: "",
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
  press,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return (
    <button className={clsx(buttonVariants({ variant, size, press }), className)} {...props} />
  );
}

export { Button, buttonVariants };
