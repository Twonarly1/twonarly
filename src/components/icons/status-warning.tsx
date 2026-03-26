import { cn } from "@/lib/utils";

export const StatusWarningIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={cn("icon-xs shrink-0", className)}>
    <title>Warning</title>
    <path
      d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"
      fill="#f59e0b"
    />
    <text x="12" y="18.5" textAnchor="middle" fontSize="text-body-xs" fontWeight="900" fill="white">
      !
    </text>
  </svg>
);
