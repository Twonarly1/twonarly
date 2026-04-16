import { useRouter } from "@tanstack/react-router";

import { ConnectWalletDialog } from "@/components/connect-wallet-dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item";
import { toast } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { formatWalletAddress } from "@/lib/utils/format";
import { Route } from "@/routes/_authenticated/accounts";
import CopyButton from "./copy-to-clipboard";
import { EtherscanIcon } from "./icons/etherscan";

import type { Wallet } from "@/lib/db/schema";

const LinkedWalletList = () => {
  const { wallets } = Route.useLoaderData();

  const router = useRouter();

  const handleUnlink = async (wallet: Wallet) => {
    try {
      const res = await fetch("/api/auth/siwe/unlink-wallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ walletId: wallet.id }),
      });

      if (!res.ok) throw new Error("Unlink failed");

      toast.success({
        title: "Wallet unlinked",
        description: `${formatWalletAddress(wallet.address)} removed from your account.`,
      });
      router.invalidate();
    } catch (error) {
      console.error("Unlink wallet error:", error);
      toast.error({ title: "Failed to unlink wallet" });
    }
  };

  return (
    <ItemGroup className="rounded-lg border">
      {wallets?.length === 0 ? (
        <Item>
          <ItemContent>
            <ItemDescription>Connect a wallet to link it</ItemDescription>
          </ItemContent>
          <ItemActions>
            <ConnectWalletDialog
              mode="link"
              trigger={
                <Button variant="ghost" size="sm">
                  Connect wallet
                </Button>
              }
            />
          </ItemActions>
        </Item>
      ) : (
        wallets.map((wallet) => (
          <Item key={wallet.id} size="sm">
            <ItemContent>
              <ItemTitle>{formatWalletAddress(wallet.address)}</ItemTitle>
            </ItemContent>
            <ItemActions>
              <a
                href={`https://etherscan.io/address/${wallet.address}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "mr-auto cursor-pointer",
                  buttonVariants({ variant: "outline", size: "icon-sm" }),
                )}
              >
                <EtherscanIcon className="icon-sm" />
              </a>

              <CopyButton text={wallet.address} />
              <Button variant="ghost" size="sm" onClick={() => handleUnlink(wallet)}>
                Unlink
              </Button>
            </ItemActions>
          </Item>
        ))
      )}
    </ItemGroup>
  );
};

export default LinkedWalletList;
