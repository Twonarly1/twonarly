import { Suspense, lazy, useEffect, useState } from "react";

import { ConnectWalletSkeleton } from "@/components/siwe/connect-wallet-skeleton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import type { ReactNode } from "react";

const ConnectWalletContent = lazy(() =>
  Promise.all([
    import("@/components/siwe/connect-wallet-content").then((mod) => ({
      default: mod.ConnectWalletContent,
    })),
    new Promise((resolve) => setTimeout(resolve, 800)),
  ]).then(([mod]) => mod),
);

interface Props {
  trigger: ReactNode;
  mode?: "link" | "sign-in";
}

export function ConnectWalletDialog({ trigger, mode }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const [key, setKey] = useState(0);

  if (!mounted) return <>{trigger}</>;

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) setKey((k) => k + 1);
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "link" ? "Link Wallet" : "Sign In With Ethereum"}</DialogTitle>
          <DialogDescription>
            Connect your wallet to get started.{" "}
            <a
              href="https://ethereum.org/wallets/"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-primary hover:underline"
            >
              What&apos;s a wallet?
            </a>
          </DialogDescription>
        </DialogHeader>

        <Suspense fallback={<ConnectWalletSkeleton />}>
          <ConnectWalletContent key={key} mode={mode} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
