import { Children, cloneElement, isValidElement } from "react";

import { cn } from "@/lib/utils";

import type { ReactElement, ReactNode } from "react";

/**
 * Minimal Slot component that replicates Radix's asChild pattern.
 * Merges parent props onto the single child element.
 *
 * - className is merged via cn()
 * - event handlers from parent override child (same as Radix)
 * - all other props spread onto child
 */
function Slot({ children, ...props }: { children?: ReactNode } & Record<string, unknown>) {
  if (Children.count(children) !== 1 || !isValidElement(children)) {
    throw new Error("Slot expects exactly one child element");
  }

  const child = children as ReactElement<Record<string, unknown>>;
  const childProps = child.props as Record<string, unknown>;

  return cloneElement(child, {
    ...props,
    ...childProps,
    className: cn(props.className as string, childProps.className as string),
  });
}

export { Slot };
