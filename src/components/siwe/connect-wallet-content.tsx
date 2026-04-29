import { useNavigate, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { match } from "ts-pattern";

import { StatusErrorIcon } from "@/components/icons/status-error";
import ConnectOptionList from "@/components/siwe/connect-option-list";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { toast } from "@/components/ui/toast";
import { AUTH_BASE, authClient } from "@/lib/auth/auth-client";
import { useInjectedWallets } from "@/lib/hooks/use-injected-wallets";
import { buttonVariants } from "../ui/button";

import type { EIP6963Provider } from "@/lib/hooks/use-injected-wallets";

type SiweStep = "idle" | "connecting" | "signing" | "verifying" | "error";

interface Props {
  mode?: "link" | "sign-in";
}

export function ConnectWalletContent({ mode }: Props) {
  const router = useRouter();
  const navigate = useNavigate();
  const wallets = useInjectedWallets();

  const [step, setStep] = useState<SiweStep>("idle");
  const [activeWallet, setActiveWallet] = useState<EIP6963Provider | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isProcessing = step !== "idle" && step !== "error";

  const handleConnect = async (wallet: EIP6963Provider) => {
    setActiveWallet(wallet);
    setErrorMessage(null);

    try {
      // 1. Connect — request accounts from the provider
      setStep("connecting");

      const accounts = (await wallet.provider.request({
        method: "eth_requestAccounts",
      })) as string[];

      const address = accounts[0] as `0x${string}`;
      if (!address) throw new Error("No account returned");

      const chainIdHex = (await wallet.provider.request({
        method: "eth_chainId",
      })) as string;
      const chainId = Number.parseInt(chainIdHex, 16);

      // 2. Get nonce + build SIWE message + sign
      setStep("signing");

      const { data: nonceData } = await authClient.siwe.nonce({
        walletAddress: address,
        chainId,
      });

      if (!nonceData?.nonce) throw new Error("Failed to get nonce");

      const message = buildSiweMessage({
        address,
        chainId,
        nonce: nonceData.nonce,
        statement:
          mode === "link"
            ? "Welcome! Please sign this message to securely link your wallet. No blockchain transaction will be made and no gas fees will apply."
            : "Sign this message to sign in with your wallet.",
      });

      const signature = (await wallet.provider.request({
        method: "personal_sign",
        params: [message, address],
      })) as string;

      // 3. Verify
      setStep("verifying");

      if (mode === "link") {
        const res = await fetch(`${AUTH_BASE}/siwe/link-wallet`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ message, signature, walletAddress: address, chainId }),
        });

        if (!res.ok) {
          const body = await res.json().catch(() => null);
          throw new Error(body?.message ?? "Failed to link wallet");
        }

        router.invalidate();
        toast.success({
          title: "Wallet linked",
          description: "Your wallet has been linked to your account.",
        });
      } else {
        const { data, error } = await authClient.siwe.verify({
          message,
          signature,
          walletAddress: address,
          chainId,
        });

        if (error || !data)
          throw new Error("This wallet isn't linked to an account. Link it in settings first.");

        navigate({ to: "/tasks" });
      }
    } catch (error) {
      setStep("error");
      console.error("Wallet error:", error);
      setErrorMessage(getFriendlyError(error));
    }
  };

  if (isProcessing) {
    return (
      <div className="mx-auto grid h-52 w-full items-center py-4">
        <div className="relative mx-auto flex size-20 items-center justify-center">
          <div className="absolute inset-0 animate-spin rounded-full border-2 border-muted border-t-primary" />
          <div className="flex size-12 items-center justify-center rounded-xl">
            {activeWallet && (
              <img src={activeWallet.info.icon} alt={activeWallet.info.name} className="size-10" />
            )}
          </div>
        </div>

        <span className="text-center text-muted-foreground">
          {match(step)
            .with("connecting", () => "Click connect in your wallet popup")
            .with("signing", () => "Waiting for wallet confirmation…")
            .with("verifying", () => "Verifying…")
            .otherwise(() => "")}
        </span>
      </div>
    );
  }

  if (wallets.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No wallets detected.</EmptyTitle>
          <EmptyDescription>
            No wallets found. Install a browser wallet like MetaMask to continue.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <a
            href="https://metamask.io/"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ className: "cursor-pointer" })}
          >
            Metamask &#8599;
          </a>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <>
      {step === "error" && (
        <Item variant="destructive" className="space-x-2 rounded-xl">
          <ItemMedia>
            <StatusErrorIcon />
          </ItemMedia>
          <ItemContent className="-mt-0.5">
            <ItemTitle className="text-destructive">Connection failed</ItemTitle>
            <ItemDescription className="text-destructive/80">{errorMessage}</ItemDescription>
          </ItemContent>
        </Item>
      )}

      <ConnectOptionList wallets={wallets} onConnect={handleConnect} disabled={isProcessing} />
    </>
  );
}

function getFriendlyError(error: unknown): string {
  const message = error instanceof Error ? error.message.toLowerCase() : "";
  const code = (error as { code?: number })?.code;

  // EIP-1193 error codes
  if (code === 4001) return "You declined the request in your wallet.";
  if (code === 4100) return "Wallet is not authorized. Please unlock it and try again.";
  if (code === 4200) return "Your wallet doesn't support this request.";
  if (code === 4900 || code === 4901)
    return "Wallet is disconnected. Please reconnect and try again.";

  if (message.includes("already linked"))
    return "This wallet is already linked to another account. Each wallet can only be linked to one account.";

  if (message.includes("already have a wallet"))
    return "You already have a wallet linked. Unlink it first in settings.";

  if (message.includes("no account")) return "No account found in your wallet.";
  if (message.includes("nonce")) return "Authentication failed. Please try again.";
  if (message.includes("link failed")) return "Failed to link wallet. Please try again.";
  if (message.includes("not linked") || message.includes("link it in settings"))
    return "This wallet isn't linked to an account yet. You can link it in settings.";

  return "Something went wrong. Please try again.";
}

function buildSiweMessage({
  address,
  chainId,
  nonce,
  statement,
}: {
  address: string;
  chainId: number;
  nonce: string;
  statement: string;
}) {
  const domain = window.location.host;
  const uri = window.location.origin;
  const issuedAt = new Date().toISOString();
  const expirationTime = new Date(Date.now() + 5 * 60 * 1000).toISOString();

  return [
    `${domain} wants you to sign in with your Ethereum account:`,
    address,
    "",
    statement,
    "",
    `URI: ${uri}`,
    `Version: 1`,
    `Chain ID: ${chainId}`,
    `Nonce: ${nonce}`,
    `Issued At: ${issuedAt}`,
    `Expiration Time: ${expirationTime}`,
  ].join("\n");
}
