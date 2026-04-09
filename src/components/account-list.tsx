import { useNavigate, useRouter } from "@tanstack/react-router";
import { Repeat } from "lucide-react";

import { GitHubIcon } from "@/components/icons/github";
import { GoogleIcon } from "@/components/icons/google";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Item, ItemActions, ItemContent, ItemDescription, ItemGroup } from "@/components/ui/item";
import { authClient, signIn, signOut } from "@/lib/auth/auth-client";
import { Route } from "@/routes/_authenticated/accounts";

const AccountList = () => {
  const { deviceSessions } = Route.useRouteContext();
  const { accounts } = Route.useLoaderData();

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

  return (
    <ItemGroup className="rounded-lg border">
      {deviceSessions.map((deviceSession) => {
        const isCurrent = deviceSession.user.id === session?.user.id;
        const provider = accounts.find((a) => a.userId === deviceSession.user.id)?.providerId;

        return (
          <Item key={deviceSession.session.token} size="sm">
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
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-body">{deviceSession.user.name}</p>
                    {provider === "google" && <GoogleIcon className="size-3.5" />}
                    {provider === "github" && <GitHubIcon className="size-3.5" />}
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
                <>
                  <div className="hidden items-center gap-2 sm:flex">
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

                  {/* mobile dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="sm:hidden">
                        Manage
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuGroup className="space-y-0.5">
                        <DropdownMenuItem
                          onSelect={() => handleAccountSwitch(deviceSession.session.token!)}
                        >
                          <Repeat className="icon-xs" />
                          Switch to this account
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onSelect={() => handleRemoveAccount(deviceSession.session.token!)}
                        >
                          Revoke access
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
            </ItemActions>
          </Item>
        );
      })}

      <Item>
        <ItemContent>
          <ItemDescription>Sign in with another account</ItemDescription>
        </ItemContent>
        <ItemActions>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                Add account
              </Button>
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
    </ItemGroup>
  );
};

export default AccountList;
