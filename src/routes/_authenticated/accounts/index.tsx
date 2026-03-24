import { createFileRoute, useRouter } from "@tanstack/react-router";

import AccountList from "@/components/account-list";
import { GitHubIcon } from "@/components/icons/github";
import { GoogleIcon } from "@/components/icons/google";
import PasskeyList from "@/components/passkey-list";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@/components/ui/item";
import { authClient, signIn } from "@/lib/auth/auth-client";
import { getAccountsByUserIds } from "@/server/functions/get-accounts";
import { getDeviceSessions } from "@/server/functions/session/get-device-sessions";
import { getUserPasskeys } from "@/server/functions/user/get-passkeys";

export const Route = createFileRoute("/_authenticated/accounts/")({
  component: RouteComponent,
  loader: async () => {
    const deviceSessions = await getDeviceSessions();
    const userIds = deviceSessions.map((s) => s.user.id);
    const accounts = await getAccountsByUserIds({ data: { userIds } });

    return { deviceSessions, accounts: accounts ?? [], passkeys: await getUserPasskeys() };
  },
});

function RouteComponent() {
  const { deviceSessions, accounts, passkeys } = Route.useLoaderData();
  const router = useRouter();

  const handleAddPasskey = async () => {
    const { error } = await authClient.passkey.addPasskey({
      name: "example-passkey-name",
      authenticatorAttachment: "platform",
    });

    if (!error) router.invalidate();
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm">Add account</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="space-y-0.5">
                <DropdownMenuItem onClick={() => signIn("google")}>
                  <GoogleIcon className="size-4" />
                  Google
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signIn("github")}>
                  <GitHubIcon className="size-4" />
                  GitHub
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </ItemActions>
        </Item>

        <AccountList deviceSessions={deviceSessions} accounts={accounts} />
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

        <PasskeyList passkeys={passkeys} />
      </div>
    </div>
  );
}
