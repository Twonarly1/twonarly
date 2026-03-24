import { createFileRoute } from "@tanstack/react-router";

import AccountList from "@/components/account-list";
import PasskeyList from "@/components/passkey-list";
import { Button } from "@/components/ui/button";
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { authClient, signIn } from "@/lib/auth/auth-client";
import { getDeviceSessions } from "@/server/functions/session/get-device-sessions";
import { getUserPasskeys } from "@/server/functions/user/get-passkeys";

export const Route = createFileRoute("/_authenticated/accounts/")({
  component: RouteComponent,
  loader: async () => ({
    deviceSessions: await getDeviceSessions(),
    passkeys: await getUserPasskeys(),
  }),
});

function RouteComponent() {
  const { deviceSessions, passkeys } = Route.useLoaderData();

  const fetchPasskeys = async () => {
    await authClient.passkey.listUserPasskeys();
  };

  const handleAddPasskey = async () => {
    const { error } = await authClient.passkey.addPasskey({
      name: "example-passkey-name",
      authenticatorAttachment: "platform",
    });

    if (!error) fetchPasskeys();
  };

  return (
    <div className="container mx-auto space-y-6 p-4 sm:space-y-12">
      <h1 className="items-baseline font-medium text-h1">Security & access</h1>

      <div className="space-y-4">
        {/* Accounts */}
        <Item className="px-0">
          <ItemContent>
            <ItemTitle>Accounts</ItemTitle>
            <ItemDescription>Signed-in accounts on this device</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button size="sm" onClick={signIn} className="ml-auto">
              Add account
            </Button>
          </ItemActions>
        </Item>

        <AccountList deviceSessions={deviceSessions} />
      </div>

      <div className="space-y-4">
        {/* Passkeys */}
        <Item className="px-0">
          <ItemContent>
            <ItemTitle>Passkeys</ItemTitle>
            <ItemDescription>Sign in with biometrics like Face ID or Touch ID</ItemDescription>
          </ItemContent>
          <ItemActions>
            <Button size="sm" onClick={handleAddPasskey}>
              Add passkey
            </Button>
          </ItemActions>
        </Item>

        <PasskeyList passkeys={passkeys} fetchPasskeys={fetchPasskeys} />
      </div>
    </div>
  );
}
