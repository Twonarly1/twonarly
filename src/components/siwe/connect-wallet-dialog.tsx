import { Suspense, lazy, useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ConnectWalletSkeleton } from "./connect-wallet-skeleton";

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

  if (!mounted) return <>{trigger}</>;

  return (
    <Dialog>
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
          <ConnectWalletContent mode={mode} />
        </Suspense>
      </DialogContent>
    </Dialog>
  );
}
