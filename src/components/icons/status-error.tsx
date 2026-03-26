import { cn } from "@/lib/utils";

export const StatusErrorIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={cn("icon-xs shrink-0", className)}>
    <title>Error</title>
    <circle cx="12" cy="12" r="12" fill="#ef4444" />
    <path d="M8 8l8 8M16 8l-8 8" stroke="white" strokeWidth="3" strokeLinecap="round" fill="none" />
  </svg>
);
