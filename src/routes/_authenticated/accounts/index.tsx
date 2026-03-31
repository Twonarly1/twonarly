import { createFileRoute } from "@tanstack/react-router";

import AccountList from "@/components/account-list";
import { Item, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { fetchAccounts } from "@/server/functions/accounts/fetch-accounts";
import { getDeviceSessions } from "@/server/functions/session/get-device-sessions";

export const Route = createFileRoute("/_authenticated/accounts/")({
  component: AccountsPage,
  loader: async () => {
    const deviceSessions = await getDeviceSessions();
    const userIds = deviceSessions.map((s) => s.user.id);
    const accounts = await fetchAccounts({ data: { userIds } });

    return { deviceSessions, accounts: accounts ?? [] };
  },
});

function AccountsPage() {
  const { deviceSessions, accounts } = Route.useLoaderData();

  return (
    <div className="container mx-auto space-y-6 p-4 sm:space-y-12">
      <h1 className="items-baseline font-medium text-h1">Security & access</h1>

      <div className="space-y-4">
        <Item className="px-0">
          <ItemContent>
            <ItemTitle>Accounts</ItemTitle>
            <ItemDescription>Accounts you've signed into on this device</ItemDescription>
          </ItemContent>
        </Item>

        <AccountList deviceSessions={deviceSessions} accounts={accounts} />
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
