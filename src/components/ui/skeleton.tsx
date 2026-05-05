import clsx from "clsx";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={clsx("animate-pulse rounded-lg bg-muted", className)}
      {...props}
    />
  );
}

export { Skeleton };

export function skeletonRows(count: number) {
  return Array.from({ length: count }, (_, i) => i);
}
