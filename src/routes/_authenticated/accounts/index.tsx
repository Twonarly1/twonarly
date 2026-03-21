import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { Repeat } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Item, ItemActions, ItemContent, ItemGroup } from "@/components/ui/item";
import { LoadingSwap } from "@/components/ui/loading-swap";
import { authClient } from "@/lib/auth/auth-client";
import { getDeviceSessions } from "@/server/functions/get-device-sessions";
import { getSessions } from "@/server/functions/get-sessions";

export const Route = createFileRoute("/_authenticated/accounts/")({
  component: RouteComponent,
  loader: async () => ({
    deviceSessions: await getDeviceSessions(),
    sessions: await getSessions(),
  }),
});

function RouteComponent() {
  const { deviceSessions } = Route.useLoaderData();

  const router = useRouter();
  const navigate = useNavigate();

  const { data: session, isPending } = authClient.useSession();

  const handleAccountSwitch = async (token: string) => {
    await authClient.multiSession.setActive({ sessionToken: token });
    router.invalidate();
  };

  const removeAccount = async (token: string) => {
    await authClient.multiSession.revoke({ sessionToken: token });
    router.invalidate();
  };

  const signIn = async () =>
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/accounts",
    });

  const signOut = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => navigate({ to: "/" }),
        },
      });
    } catch (err) {
      console.error("Failed to sign out:", err);
    }
  };

  const sortedDeviceSessions = [...(deviceSessions ?? [])].sort((a, b) => {
    const aIsCurrent = a.user.id === session?.user.id;
    const bIsCurrent = b.user.id === session?.user.id;
    return aIsCurrent ? -1 : bIsCurrent ? 1 : 0;
  });

  if (isPending) {
    return (
      <div className="flex h-dvh items-center justify-center">
        <LoadingSwap isLoading={isPending} className="flex items-center gap-2">
          Loading
        </LoadingSwap>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-12 p-4">
      <div>
        <h1 className="items-baseline font-medium text-h1">Security & access</h1>
      </div>

      {/* Account switcher — one entry per signed-in account on this device */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h4 className="items-baseline font-medium text-h4">Accounts</h4>
            <p className="text-muted-foreground">Signed-in accounts on this device</p>
          </div>

          <Button size="sm" onClick={signIn} className="ml-auto">
            Add an account
          </Button>
        </div>

        <ItemGroup className="rounded-lg border">
          {sortedDeviceSessions.map((deviceSession) => {
            const isCurrent = deviceSession.user.id === session?.user.id;

            return (
              <Item size="sm" key={deviceSession.session.token}>
                <ItemContent>
                  <div className="flex items-center gap-2">
                    <Avatar className="size-8 rounded-lg">
                      <AvatarImage
                        src={deviceSession.user.image || undefined}
                        alt={deviceSession.user.name}
                      />
                      <AvatarFallback className="rounded-lg">
                        {deviceSession.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-baseline gap-2">
                        <p className="font-medium text-body">{deviceSession.user.name}</p>

                        {isCurrent && (
                          <span className="font-medium text-body-sm text-green-600">Active</span>
                        )}
                      </div>
                      <p className="text-body-sm text-muted-foreground">
                        {deviceSession.user.email}
                      </p>
                    </div>
                  </div>
                </ItemContent>
                <ItemActions>
                  {isCurrent ? (
                    <Button variant="ghost" size="sm" onClick={signOut}>
                      Log out
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAccountSwitch(deviceSession.session.token!)}
                      >
                        <Repeat className="icon-xs" />
                        Switch
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeAccount(deviceSession.session.token!)}
                      >
                        Revoke
                      </Button>
                    </div>
                  )}
                </ItemActions>
              </Item>
            );
          })}
        </ItemGroup>
      </div>
    </div>
  );
}
