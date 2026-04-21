import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";

import type { ComponentProps } from "react";

interface CheckboxProps extends Omit<ComponentProps<"button">, "onChange"> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

function Checkbox({
  checked = false,
  onCheckedChange,
  disabled = false,
  className,
  ...props
}: CheckboxProps) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: Need children
    <button
      role="checkbox"
      aria-checked={checked}
      data-slot="checkbox"
      data-state={checked ? "checked" : "unchecked"}
      disabled={disabled}
      onClick={() => onCheckedChange?.(!checked)}
      className={cn(
        "peer grid size-4 shrink-0 place-content-center rounded-[3px] border border-border shadow-xs outline-none",
        "transition-colors duration-150 ease-out-strong",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        "focus-visible:ring-1 focus-visible:ring-ring",
        checked
          ? "border-primary bg-primary text-primary-foreground dark:bg-primary"
          : "dark:bg-input/30",
        className,
      )}
      {...props}
    >
      {checked && <CheckIcon className="size-3" />}
    </button>
  );
}

export { Checkbox };
