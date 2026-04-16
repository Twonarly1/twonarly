import { createFileRoute } from "@tanstack/react-router";

import AccountList from "@/components/account-list";
import LinkedWalletList from "@/components/linked-wallet-list";
import PageContainer from "@/components/page-container";
import PasskeyList from "@/components/passkey-list";
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { fetchAccounts } from "@/server/functions/accounts/fetch-accounts";
import { fetchUserPasskeys } from "@/server/functions/user/fetch-passkeys";
import { fetchLinkedWallets } from "@/server/functions/wallet/fetch-linked-wallets";

export const Route = createFileRoute("/_authenticated/accounts/")({
  component: AccountsPage,
  loader: async () => {
    const accounts = await fetchAccounts();
    const wallets = await fetchLinkedWallets();
    const passkeys = await fetchUserPasskeys();
    return { accounts, wallets, passkeys };
  },
});

function AccountsPage() {
  return (
    <PageContainer>
      <h1 className="items-baseline font-medium text-h1">Security & Access</h1>

      <div className="space-y-4">
        <Item>
          <ItemContent>
            <ItemTitle>Accounts</ItemTitle>
            <ItemDescription>Accounts you've signed into on this device</ItemDescription>
          </ItemContent>
        </Item>

        <AccountList />
      </div>

      <div className="space-y-4">
        <Item>
          <ItemContent>
            <ItemTitle>Ethereum wallet</ItemTitle>
            <ItemDescription>Link a wallet to Sign In With Ethereum</ItemDescription>
          </ItemContent>
        </Item>

        <LinkedWalletList />
      </div>

      <div className="space-y-4">
        <Item>
          <ItemContent>
            <ItemTitle>Passkeys</ItemTitle>
            <ItemDescription>Sign in with biometrics like Face ID or Touch ID</ItemDescription>
          </ItemContent>
        </Item>

        <PasskeyList />
      </div>
    </PageContainer>
  );
}
