import { useNavigate, useRouter } from "@tanstack/react-router";
import { ArrowLeft, XCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { match } from "ts-pattern";
import { useConnect, useConnectors, useSignMessage } from "wagmi";

import ConnectOptionList from "@/components/connect-option-list";
import { WalletConnectIcon } from "@/components/icons/wallet-connect";
import { Button } from "@/components/ui/button";
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
import { authClient } from "@/lib/auth/auth-client";

import type { ReactNode } from "react";
import type { Connector } from "wagmi";

type SiweStep = "idle" | "connecting" | "signing" | "verifying" | "success" | "error";

interface Props {
  trigger: ReactNode;
  mode?: "link" | "sign-in";
}

export function ConnectWalletDialog({ trigger, mode }: Props) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const router = useRouter();
  const navigate = useNavigate();

  const connectors = useConnectors();
  const connect = useConnect();
  const signMessage = useSignMessage();

  const [step, setStep] = useState<SiweStep>("idle");
  const [activeConnector, setActiveConnector] = useState<Connector | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const filteredConnectors = connectors.filter((c) => c.id !== "injected");
  const installed = filteredConnectors.filter((c) => c.type === "injected");
  const popular = filteredConnectors.filter((c) => c.type !== "injected");

  // Not connecting, signing, or verifying
  const isProcessing = step !== "idle" && step !== "error" && step !== "success";

  const handleConnect = async (connector: Connector) => {
    setActiveConnector(connector);
    setErrorMessage(null);

    try {
      let address: `0x${string}`;
      let chainId: number;

      const accounts = await connector.getAccounts();

      if (accounts.length > 0) {
        address = accounts[0];
        const provider = await connector.getProvider();
        // biome-ignore lint/suspicious/noExplicitAny: TODO
        const chainHex = await (provider as any).request({ method: "eth_chainId" });
        chainId = parseInt(chainHex, 16);
        setStep("signing");
      } else {
        setStep("connecting");
        const result = await connect.mutateAsync({ connector });
        address = result.accounts[0];
        chainId = result.chainId;
        setStep("signing");
      }

      if (!address) throw new Error("No address returned");

      // Linking flow
      if (mode === "link") {
        const nonce = crypto.randomUUID();

        const message = `Sign in to ${window.location.host}

Welcome 👋

Please sign this message to securely authenticate with your wallet.
No blockchain transaction will be made and no gas fees will apply.

Nonce: ${nonce}`;

        const signature = await signMessage.mutateAsync({ message });

        setStep("verifying");

        const res = await fetch("/api/auth/siwe/link-wallet", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            message,
            signature,
            walletAddress: address,
            chainId,
          }),
        });

        if (!res.ok) throw new Error("Link failed");

        setStep("success");
        router.invalidate();
        toast.success({
          title: "Wallet linked",
          description: "Your wallet has been linked to your account.",
        });
      } else {
        // Sign-in flow
        const { data: nonceData } = await authClient.siwe.nonce({
          walletAddress: address,
          chainId,
        });

        if (!nonceData?.nonce) throw new Error("Failed to get nonce");

        const message = `Sign this message to sign in with your wallet. Nonce: ${nonceData.nonce}`;

        const provider = (await connector.getProvider()) as {
          request: (args: { method: string; params: unknown[] }) => Promise<string>;
        };

        const signature = await provider.request({
          method: "personal_sign",
          params: [message, address],
        });

        setStep("verifying");

        const { data, error } = await authClient.siwe.verify({
          message,
          signature,
          walletAddress: address,
          chainId: 1,
        });

        if (error || !data) {
          throw new Error("This wallet isn't linked to an account. Link it in settings first.");
        }

        setStep("success");
        navigate({ to: "/tasks" });
      }
    } catch (error) {
      console.error("Wallet error:", error);
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
      setStep("error");
    }
  };

  const handleReset = () => {
    setStep("idle");
    setActiveConnector(null);
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
        {step === "idle" || step === "error" || step === "success" ? (
          <>
            <DialogHeader>
              <DialogTitle>{mode === "link" ? "Link Wallet" : "Sign In With Ethereum"}</DialogTitle>
              <DialogDescription>
                Instead of creating new accounts and passwords on every website, just connect your
                wallet.
              </DialogDescription>
            </DialogHeader>

            {step === "error" && (
              <Item size="sm" className="rounded-lg border border-destructive/20 bg-destructive/5">
                <ItemMedia>
                  <XCircle className="size-4 text-destructive" />
                </ItemMedia>
                <ItemContent>
                  <ItemTitle className="text-destructive">{activeConnector?.name} failed</ItemTitle>
                  <ItemDescription className="text-destructive/80">{errorMessage}</ItemDescription>
                </ItemContent>
              </Item>
            )}

            <div className="grid gap-4">
              {[
                { title: "Installed", connectors: installed },
                { title: "Popular", connectors: popular },
              ].map((section) => (
                <Item key={section.title} size="sm" className="px-0">
                  <ItemContent>
                    <ItemTitle>{section.title}</ItemTitle>
                    <ConnectOptionList
                      connectors={section.connectors}
                      onConnect={handleConnect}
                      disabled={false}
                    />
                  </ItemContent>
                </Item>
              ))}
            </div>

            <p className="text-center text-body-sm text-muted-foreground hover:underline">
              What's a wallet?
            </p>
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
              <DialogTitle className="font-normal text-h3">
                {match(step)
                  .with("connecting", () => "Connect")
                  .with("signing", () => `Sign`)
                  .with("verifying", () => "Verifying...")
                  .otherwise(() => "")}
              </DialogTitle>
            </DialogHeader>

            <div className="mt-2 flex flex-col items-center gap-6">
              <div className="relative flex size-20 items-center justify-center">
                {/* Spinning ring around the icon */}
                <div className="absolute inset-0 animate-spin rounded-full border-2 border-muted border-t-primary" />

                {/* Connector icon in the center */}
                <div className="flex size-12 items-center justify-center rounded-xl">
                  {match(activeConnector?.id)
                    .with("walletConnect", () => <WalletConnectIcon className="size-5" />)
                    .otherwise(() => (
                      <img
                        src={activeConnector?.icon}
                        alt={activeConnector?.name}
                        className="size-10 rounded"
                      />
                    ))}
                </div>
              </div>
              {step === "connecting" && "Click connect in your wallet popup"}
              {step === "signing" && "Waiting for wallet confirmation…"}{" "}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
