import { useNavigate, useRouter } from "@tanstack/react-router";
import { Repeat } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Item, ItemActions, ItemContent, ItemGroup } from "@/components/ui/item";
import { authClient, signOut } from "@/lib/auth/auth-client";

import type { Session, User } from "better-auth";

interface DeviceSession {
  user: User;
  session: Session;
}

interface Props {
  deviceSessions: DeviceSession[];
}

const AccountList = ({ deviceSessions }: Props) => {
  const router = useRouter();
  const navigate = useNavigate();

  const { data: session } = authClient.useSession();

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/" });
  };

  const handleAccountSwitch = async (token: string) => {
    await authClient.multiSession.setActive({ sessionToken: token });
    router.invalidate();
  };

  const handleRemoveAccount = async (token: string) => {
    await authClient.multiSession.revoke({ sessionToken: token });
    router.invalidate();
  };

  const sortedDeviceSessions = [...(deviceSessions ?? [])].sort((a, b) => {
    const aIsCurrent = a.user.id === session?.user.id;
    const bIsCurrent = b.user.id === session?.user.id;
    return aIsCurrent ? -1 : bIsCurrent ? 1 : 0;
  });

  if (sortedDeviceSessions.length === 0) return null;

  return (
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
                  <p className="text-body-sm text-muted-foreground">{deviceSession.user.email}</p>
                </div>
              </div>
            </ItemContent>
            <ItemActions>
              {isCurrent ? (
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
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
                    onClick={() => handleRemoveAccount(deviceSession.session.token!)}
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
  );
};

export default AccountList;
