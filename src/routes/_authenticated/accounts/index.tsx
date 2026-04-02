import { createFileRoute } from "@tanstack/react-router";

import AccountList from "@/components/account-list";
import LinkedWalletList from "@/components/linked-wallet-list";
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { fetchAccounts } from "@/server/functions/accounts/fetch-accounts";
import { fetchLinkedWallets } from "@/server/functions/wallet/fetch-linked-wallets";

export const Route = createFileRoute("/_authenticated/accounts/")({
  component: AccountsPage,
  loader: async () => {
    const accounts = await fetchAccounts();
    const wallets = await fetchLinkedWallets();
    return { accounts, wallets };
  },
});

function AccountsPage() {
  const { accounts, wallets } = Route.useLoaderData();
  const { deviceSessions } = Route.useRouteContext();

  return (
    <div className="container mx-auto space-y-6 p-4 sm:space-y-12">
      <h1 className="items-baseline font-medium text-h1">Security & Access</h1>

      <div className="space-y-4">
        <Item size="sm" className="px-0">
          <ItemContent>
            <ItemTitle>Accounts</ItemTitle>
            <ItemDescription>Accounts you've signed into on this device</ItemDescription>
          </ItemContent>
        </Item>

        <AccountList deviceSessions={deviceSessions} accounts={accounts} />
      </div>

      <div className="space-y-4">
        <Item size="sm" className="px-0">
          <ItemContent>
            <ItemTitle>Ethereum wallet</ItemTitle>
            <ItemDescription>Link a wallet to Sign In With Ethereum</ItemDescription>
          </ItemContent>
        </Item>

        <LinkedWalletList wallets={wallets} />
      </div>

      {/* <div className="space-y-4">
        <Item className="px-0">
          <ItemContent>
            <ItemTitle>Passkeys</ItemTitle>
            <ItemDescription>Sign in with biometrics like Face ID or Touch ID</ItemDescription>
          </ItemContent>
        </Item>

        <PasskeyList passkeys={passkeys} />
      </div> */}
    </div>
  );
}
