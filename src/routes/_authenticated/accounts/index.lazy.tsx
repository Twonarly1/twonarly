import { createLazyFileRoute } from "@tanstack/react-router";

import AccountList from "@/components/account-list";
import PageContainer from "@/components/layout/page-container";
import Section from "@/components/layout/section";
import PasskeyList from "@/components/passkey-list";
import LinkedWalletList from "@/components/siwe/linked-wallet-list";

export const Route = createLazyFileRoute("/_authenticated/accounts/")({
  component: AccountsPage,
});

function AccountsPage() {
  return (
    <PageContainer>
      <h1 className="items-baseline px-4 font-medium text-4xl">Security & Access</h1>

      <Section title="Accounts" description="Accounts you've signed into on this device">
        <AccountList />
      </Section>

      <Section title="Ethereum wallet" description="Link a wallet to Sign In With Ethereum">
        <LinkedWalletList />
      </Section>

      <Section title="Passkeys" description="Sign in with biometrics like Face ID or Touch ID">
        <PasskeyList />
      </Section>
    </PageContainer>
  );
}
