import { useRouter } from "@tanstack/react-router";

import { ConnectWalletDialog } from "@/components/siwe/connect-wallet-dialog";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@/components/ui/item";
import { toast } from "@/components/ui/toast";
import { AUTH_BASE } from "@/lib/auth/auth-client";
import { formatWalletAddress } from "@/lib/utils/format";
import { Route } from "@/routes/_authenticated/accounts";

import type { Wallet } from "@/lib/db/schema";

const LinkedWalletList = () => {
  const { wallets } = Route.useLoaderData();

  const router = useRouter();

  const handleUnlink = async (wallet: Wallet) => {
    try {
      const res = await fetch(`${AUTH_BASE}/siwe/unlink-wallet`, {
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
          <ItemActions className="p-0">
            <ConnectWalletDialog
              mode="link"
              trigger={<Button variant="ghost">Connect wallet</Button>}
            />
          </ItemActions>
        </Item>
      ) : (
        wallets.map((wallet) => (
          <Item key={wallet.id}>
            <ItemContent>
              <ItemTitle>{formatWalletAddress(wallet.address)}</ItemTitle>
              <ItemDescription>
                <a
                  href={`https://etherscan.io/address/${wallet.address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on etherscan ↗
                </a>
              </ItemDescription>
            </ItemContent>
            <ItemActions>
              <Button variant="ghost" onClick={() => handleUnlink(wallet)}>
                Remove
              </Button>
            </ItemActions>
          </Item>
        ))
      )}
    </ItemGroup>
  );
};

export default LinkedWalletList;
