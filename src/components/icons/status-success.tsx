export const StatusSuccessIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className ?? "icon-sm shrink-0"}>
    <title>Success</title>
    <circle cx="12" cy="12" r="10" fill="#22c55e" />
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
