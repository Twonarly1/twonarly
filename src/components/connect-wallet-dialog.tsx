import { useNavigate, useRouter } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, MousePointerClick, ShieldCheck, Vault } from "lucide-react";
import { useEffect, useState } from "react";
import { match } from "ts-pattern";

import ConnectOptionList from "@/components/connect-option-list";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { toast } from "@/components/ui/toast";
import { AUTH_BASE, authClient } from "@/lib/auth/auth-client";
import { useInjectedWallets } from "@/lib/hooks/use-injected-wallets";
import { cn } from "@/lib/utils";
import { StatusErrorIcon } from "./icons/status-error";

import type { ReactNode } from "react";
import type { EIP6963Provider } from "@/lib/hooks/use-injected-wallets";

const WALLET_EXPLAINERS = [
  {
    title: "A home for your digital assets",
    description:
      "Wallets let you store, send, and receive digital assets like Ethereum. Think of it as a secure digital bank account that only you control.",
    icon: Vault,
  },
  {
    title: "A new way to sign in",
    description:
      "Instead of creating new accounts and passwords for every app, connect your wallet with one click. Your wallet is your universal login for the decentralized web.",
    icon: MousePointerClick,
  },
  {
    title: "You own your identity",
    description:
      "Unlike traditional accounts controlled by companies, your wallet is completely yours. No one can freeze it, shut it down, or access it without your permission.",
    icon: ShieldCheck,
  },
];

type SiweStep = "idle" | "connecting" | "signing" | "verifying" | "error";

interface Props {
  trigger: ReactNode;
  mode?: "link" | "sign-in";
}

export function ConnectWalletDialog({ trigger, mode }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const router = useRouter();
  const navigate = useNavigate();

  const wallets = useInjectedWallets();

  const [step, setStep] = useState<SiweStep>("idle");
  const [activeWallet, setActiveWallet] = useState<EIP6963Provider | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [learnMoreOpen, setLearnMoreOpen] = useState(false);

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

      const message =
        mode === "link"
          ? buildSiweMessage({
              address,
              chainId,
              nonce: nonceData.nonce,
              statement:
                "Welcome! Please sign this message to securely link your wallet. No blockchain transaction will be made and no gas fees will apply.",
            })
          : buildSiweMessage({
              address,
              chainId,
              nonce: nonceData.nonce,
              statement: "Sign this message to sign in with your wallet.",
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

  const handleReset = () => {
    setStep("idle");
    setActiveWallet(null);
    setErrorMessage(null);
  };

  if (!mounted) return <>{trigger}</>;

  return (
    <Dialog
      onOpenChange={() => {
        handleReset();
      }}
    >
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent showCloseButton={!isProcessing}>
        {step === "idle" || step === "error" ? (
          <>
            <DialogHeader>
              <DialogTitle>{mode === "link" ? "Link Wallet" : "Sign In With Ethereum"}</DialogTitle>
              <DialogDescription>
                Instead of creating new accounts and passwords on every website, just connect your
                wallet.
              </DialogDescription>
            </DialogHeader>

            {step === "error" && (
              <Item variant="destructive" size="sm" className="rounded-lg">
                <ItemMedia>
                  <StatusErrorIcon />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle className="text-destructive">Connection failed</ItemTitle>
                  <ItemDescription className="text-destructive/80">{errorMessage}</ItemDescription>
                </ItemContent>
              </Item>
            )}

            {!learnMoreOpen ? (
              <div className="grid gap-4">
                {wallets.length > 0 ? (
                  <ConnectOptionList
                    wallets={wallets}
                    onConnect={handleConnect}
                    disabled={isProcessing}
                  />
                ) : (
                  <Item variant="outline" size="sm" className="rounded-lg">
                    <ItemContent>
                      <ItemDescription>
                        No wallets detected. Install a browser wallet like MetaMask to continue.
                      </ItemDescription>
                    </ItemContent>
                  </Item>
                )}

                <Button
                  variant="ghost"
                  className="mx-auto w-fit"
                  onClick={() => setLearnMoreOpen(true)}
                >
                  What&apos;s a wallet?
                </Button>
              </div>
            ) : (
              <div className="grid gap-2">
                {WALLET_EXPLAINERS.map((explainer, index) => (
                  <Item
                    key={explainer.title}
                    variant="outline"
                    size="sm"
                    className={cn("rounded-lg", index === 1 ? "border-primary" : "")}
                  >
                    <ItemContent>
                      <ItemTitle>{explainer.title}</ItemTitle>
                      <ItemDescription className="line-clamp-none">
                        {explainer.description}
                      </ItemDescription>
                    </ItemContent>
                    {explainer.icon && (
                      <ItemMedia>
                        <explainer.icon className="icon-sm" />
                      </ItemMedia>
                    )}
                  </Item>
                ))}

                <div className="flex items-end justify-end gap-2">
                  <Button variant="ghost" onClick={() => setLearnMoreOpen(false)}>
                    Cancel
                  </Button>
                  <a
                    href="https://ethereum.org/wallets/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn("mt-4 w-fit", buttonVariants({ variant: "outline" }))}
                  >
                    Learn more
                    <ArrowUpRight className="icon-sm text-muted-foreground" />
                  </a>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <DialogHeader className="relative items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="absolute top-0 left-0"
              >
                <ArrowLeft className="icon-lg" />
              </Button>
              <DialogTitle className="font-normal text-2xl">
                {match(step)
                  .with("connecting", () => "Connect")
                  .with("signing", () => "Sign")
                  .with("verifying", () => "Verifying...")
                  .otherwise(() => "")}
              </DialogTitle>
            </DialogHeader>

            <div className="mt-2 flex flex-col items-center gap-6">
              <div className="relative flex size-20 items-center justify-center">
                <div className="absolute inset-0 animate-spin rounded-full border-2 border-muted border-t-primary" />
                <div className="flex size-12 items-center justify-center rounded-xl">
                  {activeWallet && (
                    <img
                      src={activeWallet.info.icon}
                      alt={activeWallet.info.name}
                      className="size-10"
                    />
                  )}
                </div>
              </div>
              {step === "connecting" && (
                <span className="text-muted-foreground">Click connect in your wallet popup</span>
              )}
              {step === "signing" && (
                <span className="text-muted-foreground">Waiting for wallet confirmation…</span>
              )}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
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
