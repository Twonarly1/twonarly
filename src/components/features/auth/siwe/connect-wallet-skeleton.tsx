import { Skeleton, skeletonRows } from "@/components/ui/skeleton";

export function ConnectWalletSkeleton() {
  return (
    <div className="grid max-h-52 gap-2">
      {skeletonRows(4).map((i) => (
        <div
          key={i}
          className="flex h-10 items-center gap-3 rounded-md border border-transparent px-3"
        >
          <Skeleton className="size-5 rounded" />
          <Skeleton className="h-3 w-28 rounded" />
        </div>
      ))}
    </div>
  );
}
