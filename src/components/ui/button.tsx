import { cva } from "class-variance-authority";
import clsx from "clsx";

import type { VariantProps } from "class-variance-authority";
import type * as React from "react";

const buttonVariants = cva(
  "focus-visible:border-primary border focus-visible:border transition-none rounded-lg inline-flex items-center whitespace-nowrap disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 [&_svg]:shrink-0 outline-none select-none",
  {
    variants: {
      variant: {
        default: "",
        outline:
          "border-border bg-transparent hover:bg-muted custom:hover:bg-content text-secondary-foreground hover:text-foreground",
        "outline-surface":
          "border-border bg-transparent hover:bg-muted custom:hover:bg-surface text-secondary-foreground hover:text-foreground",
        ghost:
          "border-transparent text-secondary-foreground hover:bg-muted custom:hover:bg-content hover:text-foreground",
        mobileNav:
          "rounded-full transition-colors duration-150 hover:bg-muted ease-out-strong custom:hover:bg-surface",
      },
      color: {
        default: "",
        primary:
          "bg-primary border-0 focus-visible:border-0 text-primary-foreground hover:bg-primary/80 focus-visible:ring focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        destructive:
          "bg-destructive border-0 focus-visible:border-0 text-destructive-foreground hover:bg-destructive/80 focus-visible:ring focus-visible:ring-destructive focus-visible:ring-offset-2 focus-visible:ring-offset-inherit",
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
      },
    },
    defaultVariants: {
      variant: "default",
      color: "default",
      size: "sm",
    },
  },
);

function Button({
  className,
  variant,
  size,
  press,
  color,
  ...props
}: React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>) {
  return (
    <button
      className={clsx(buttonVariants({ variant, size, color, press }), className)}
      {...props}
    />
  );
}

export { Button, buttonVariants };
