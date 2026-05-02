import { useNavigate, useRouter } from "@tanstack/react-router";
import { Repeat } from "lucide-react";

import { GitHubIcon } from "@/components/icons/github";
import { GoogleIcon } from "@/components/icons/google";
import Avatar from "@/components/ui/avatar";
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

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/" });
  };

  const handleAccountSwitch = async (token: string) => {
    await authClient.multiSession.setActive({ sessionToken: token });
    await router.invalidate();
  };

  const handleRemoveAccount = async (token: string) => {
    await authClient.multiSession.revoke({ sessionToken: token });
    router.invalidate();
  };

  return (
    <ItemGroup variant="list">
      {deviceSessions.map((deviceSession) => {
        const { isCurrent } = deviceSession;
        const provider = accounts.find((a) => a.userId === deviceSession.user.id)?.providerId;

        return (
          <Item key={deviceSession.session.token}>
            <ItemContent>
              <div className="flex items-center gap-2">
                <Avatar
                  src={deviceSession.user.image}
                  alt={deviceSession.user.name}
                  className="size-8 rounded-lg"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-base text-foreground">
                      {deviceSession.user.name}
                    </p>
                    {provider === "google" && <GoogleIcon />}
                    {provider === "github" && <GitHubIcon />}
                    {isCurrent && (
                      <span className="font-medium text-green-600 text-sm">Active</span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm">{deviceSession.user.email}</p>
                </div>
              </div>
            </ItemContent>
            <ItemActions>
              {isCurrent ? (
                <Button variant="ghost" onClick={handleSignOut}>
                  Log out
                </Button>
              ) : (
                <>
                  <div className="hidden items-center gap-2 sm:flex">
                    <Button
                      variant="outline"
                      onClick={() => handleAccountSwitch(deviceSession.session.token!)}
                    >
                      <Repeat className="icon-xs" />
                      Switch
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => handleRemoveAccount(deviceSession.session.token!)}
                    >
                      Revoke
                    </Button>
                  </div>

                  {/* mobile dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="sm:hidden">
                        Manage
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuGroup>
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
              <Button variant="ghost">Add account</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => signIn("google")}>
                  <GoogleIcon />
                  Google
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signIn("github")}>
                  <GitHubIcon />
                  GitHub
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </ItemActions>
      </Item>
    </ItemGroup>
  );
};

export default AccountList;
