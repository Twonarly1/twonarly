import { Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";

import type { ReactNode } from "react";

interface Props {
  isLoading: boolean;
  children: ReactNode;
  className?: string;
}

export function LoadingSwap({ isLoading, children, className }: Props) {
  return (
    <div className="grid grid-cols-1 items-center justify-items-center">
      <div
        className={cn(
          "col-start-1 col-end-2 row-start-1 row-end-2 w-full",
          isLoading ? "invisible" : "visible",
          className,
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "col-start-1 col-end-2 row-start-1 row-end-2",
          isLoading ? "visible" : "invisible",
          className,
        )}
      >
        <Loader2 className="animate-spin" />
      </div>
    </div>
  );
}
