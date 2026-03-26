import { cn } from "@/lib/utils";

export const StatusInfoIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={cn("icon-xs shrink-0", className)}>
    <title>Info</title>
    <circle cx="12" cy="12" r="10" stroke="#3b82f6" strokeWidth="2" fill="none" />
    <circle cx="12" cy="8" r="1.2" fill="#3b82f6" />
    <path d="M12 11v5" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
