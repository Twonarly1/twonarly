import { cn } from "@/lib/utils";

export const StatusSuccessIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={cn("icon-xs shrink-0", className)}>
    <title>Success</title>
    <circle cx="12" cy="12" r="12" fill="#22c55e" />
    <path
      d="M7.5 12.5l3 3 6-6"
      stroke="white"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
  </svg>
);
