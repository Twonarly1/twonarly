import { useId } from "react";

import { cn } from "@/lib/utils";

import type { ComponentProps } from "react";

interface SwitchProps extends Omit<ComponentProps<"button">, "onChange"> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

function Switch({
  checked = false,
  onCheckedChange,
  disabled = false,
  className,
  id,
  ...props
}: SwitchProps) {
  const autoId = useId();
  const inputId = id ?? autoId;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      data-slot="switch"
      data-state={checked ? "checked" : "unchecked"}
      disabled={disabled}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        "group relative inline-flex h-5 w-7.5 shrink-0 items-center rounded-full",
        "transition-colors duration-150 ease-out-strong",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring",
        "disabled:cursor-not-allowed disabled:opacity-50",
        checked ? "bg-primary" : "bg-muted",
        className,
      )}
      {...props}
    >
      <input
        type="checkbox"
        id={inputId}
        checked={checked}
        onChange={() => onCheckedChange?.(!checked)}
        disabled={disabled}
        className="sr-only"
        tabIndex={-1}
        aria-hidden
      />

      <span
        className={cn(
          "pointer-events-none block size-3.5 rounded-full bg-background shadow-sm",
          "transition-transform duration-150 ease-out-strong",
          checked ? "translate-x-3.25" : "translate-x-0.75 group-hover:w-4",
        )}
      />
    </button>
  );
}

export { Switch };
