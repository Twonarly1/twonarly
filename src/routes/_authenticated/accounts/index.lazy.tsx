import { createLazyFileRoute } from "@tanstack/react-router";

import AccountList from "@/components/account-list";
import LinkedWalletList from "@/components/linked-wallet-list";
import PageContainer from "@/components/page-container";
import PasskeyList from "@/components/passkey-list";
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";

export const Route = createLazyFileRoute("/_authenticated/accounts/")({
  component: AccountsPage,
});

function AccountsPage() {
  return (
    <PageContainer>
      <h1 className="items-baseline font-medium text-4xl">Security & Access</h1>

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
