import { useNavigate, useRouter } from "@tanstack/react-router";
import { Check, ChevronDown, SquareDashed } from "lucide-react";

import { GitHubIcon } from "@/components/icons/github";
import { GoogleIcon } from "@/components/icons/google";
import Avatar from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { toast } from "@/components/ui/toast";
import { authClient, signIn, signOut } from "@/lib/auth/auth-client";
import { navLinks } from "@/lib/constants/nav-links";
import { useLayout } from "@/providers/layout-provider";
import { Route } from "@/routes/_authenticated";

const AppSidebar = () => {
  const { deviceSessions, user } = Route.useRouteContext();
  const navigate = useNavigate();
  const router = useRouter();
  const { layout } = useLayout();

  const handleSignOut = async () => {
    await signOut();
    await navigate({ to: "/" });
  };

  const handleAccountSwitch = async (token: string | null | undefined) => {
    if (!token) return;
    try {
      await authClient.multiSession.setActive({ sessionToken: token });
      toast.success({ title: "Account switched" });
      await router.invalidate();
    } catch (err) {
      console.error("Failed to switch account:", err);
      toast.error({ title: "Failed to switch account" });
    }
  };

  return (
    <Sidebar>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="justify-start px-0!">
                <Avatar
                  src={user.image}
                  alt={user.name || "User avatar"}
                  className="size-7.5 rounded-lg"
                />
                <span className="font-medium text-base">{user?.name}</span>
                <ChevronDown className="icon-sm mr-2 ml-auto group-data-[collapsible=icon]:hidden" />
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              align={layout.sidebarPosition === "left" ? "start" : "end"}
              side="bottom"
              sideOffset={4}
            >
              <DropdownMenuGroup>
                <DropdownMenuSub>
                  <DropdownMenuSubTrigger>Switch Account</DropdownMenuSubTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuSubContent>
                      {deviceSessions?.map((deviceSession) => (
                        <DropdownMenuItem
                          key={deviceSession.session.token}
                          onSelect={() => handleAccountSwitch(deviceSession.session.token)}
                        >
                          <Avatar
                            src={deviceSession.user.image}
                            alt={deviceSession.user.name}
                            className="mr-0.5 size-6 rounded"
                          />
                          <div className="flex flex-col">
                            <p className="text-base">{deviceSession.user.name}</p>
                            <p className="text-muted-foreground text-sm">
                              {deviceSession.user.email}
                            </p>
                          </div>
                          {deviceSession.user.id === user?.id && (
                            <Check className="icon-xs ml-auto" />
                          )}
                        </DropdownMenuItem>
                      ))}

                      <DropdownMenuSeparator />

                      <DropdownMenuSub>
                        <DropdownMenuSubTrigger>Add an account...</DropdownMenuSubTrigger>
                        <DropdownMenuPortal>
                          <DropdownMenuSubContent>
                            <DropdownMenuGroup>
                              <DropdownMenuItem onSelect={() => signIn("google")}>
                                <GoogleIcon />
                                Google
                              </DropdownMenuItem>
                              <DropdownMenuItem onSelect={() => signIn("github")}>
                                <GitHubIcon />
                                GitHub
                              </DropdownMenuItem>
                            </DropdownMenuGroup>
                          </DropdownMenuSubContent>
                        </DropdownMenuPortal>
                      </DropdownMenuSub>
                    </DropdownMenuSubContent>
                  </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem onSelect={handleSignOut}>Log out</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem>
      </SidebarMenu>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                isActive={"/dashboard" === router.state.location.pathname}
                tooltip="Dashboard"
                onClick={() => navigate({ to: "/dashboard" })}
              >
                <SquareDashed className="icon-sm" />
                <span className="text-base">Dashboard</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {navLinks.slice(1, navLinks.length).map((item) => (
              <SidebarMenuItem key={item.to}>
                <SidebarMenuButton
                  isActive={item.to === router.state.location.pathname}
                  tooltip={item.label}
                  onClick={() => navigate({ to: item.to })}
                >
                  <item.icon className="icon-sm" />
                  <span className="text-base">{item.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
