import { Switch as SwitchPrimitive } from "radix-ui";

import { cn } from "@/lib/utils";

import type * as React from "react";

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-5 w-7.5 shrink-0 items-center rounded-full outline-none transition-colors duration-100 ease-out-strong focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-muted-foreground/40",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block size-3.5 rounded-full bg-white shadow-sm transition-transform duration-100 ease-out-strong data-[state=checked]:translate-x-3.25 data-[state=unchecked]:translate-x-0.75"
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
