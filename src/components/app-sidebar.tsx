import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { Check, ChevronDown } from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";

import { GitHubIcon } from "@/components/icons/github";
import { GoogleIcon } from "@/components/icons/google";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { toast } from "@/components/ui/toast";
import { authClient, signIn, signOut } from "@/lib/auth/auth-client";
import { navLinks } from "@/lib/constants/nav-links";
import { cn } from "@/lib/utils";
import { useLayout } from "@/providers/layout-provider";
import { Route } from "@/routes/_authenticated";

const AppSidebar = () => {
  const { deviceSessions, user } = Route.useRouteContext();
  const { isMobile, toggleSidebar } = useSidebar();
  const navigate = useNavigate();
  const router = useRouter();
  const { layout } = useLayout();

  const handleSignOut = async () => {
    await signOut();
    navigate({ to: "/" });
  };

  const handleAccountSwitch = async (token: string | null | undefined) => {
    if (!token) return;
    try {
      await authClient.multiSession.setActive({ sessionToken: token });
      toast.success({ title: "Account switched" });
      router.invalidate();
    } catch (err) {
      console.error("Failed to switch account:", err);
      toast.error({ title: "Failed to switch account" });
    }
  };

  useHotkeys("b", toggleSidebar, { description: "Toggle sidebar" }, [toggleSidebar]);

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  className={cn(
                    "flex justify-start px-0!",
                    layout.sidebarVariant === "inset" && "mt-2",
                    layout.sidebarVariant === "classic" && "mt-2",
                  )}
                >
                  <Avatar role="button" className="size-7.5 overflow-hidden rounded">
                    <AvatarImage
                      src={user?.image || undefined}
                      alt={user?.name || "User avatar"}
                      className="rounded-lg"
                    />
                    <AvatarFallback className="rounded">{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <span className="truncate font-medium group-data-[collapsible=icon]:hidden">
                    {user?.name}
                  </span>
                  <ChevronDown className="icon-sm mr-2 ml-auto group-data-[collapsible=icon]:hidden" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className="min-w-52"
                align={layout.sidebarPosition === "left" ? "start" : "end"}
                side="bottom"
                sideOffset={4}
              >
                <DropdownMenuGroup className="space-y-0.5">
                  {!isMobile && (
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>Switch Account</DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent className="space-y-0.5">
                          {deviceSessions?.map((deviceSession) => (
                            <DropdownMenuItem
                              key={deviceSession.session.token}
                              onSelect={() => handleAccountSwitch(deviceSession.session.token)}
                            >
                              <Avatar className="mr-0.5 size-6 rounded">
                                <AvatarImage
                                  src={deviceSession.user.image || undefined}
                                  alt={deviceSession.user.name}
                                />
                                <AvatarFallback>{deviceSession.user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex flex-col">
                                <p className="text-body">{deviceSession.user.name}</p>
                                <p className="text-body-sm text-muted-foreground">
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
                                <DropdownMenuItem onSelect={() => signIn("google")}>
                                  <GoogleIcon className="size-4" />
                                  Google
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => signIn("github")}>
                                  <GitHubIcon className="size-4" />
                                  GitHub
                                </DropdownMenuItem>
                              </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                          </DropdownMenuSub>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  )}
                  <DropdownMenuItem onSelect={handleSignOut}>Log out</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {navLinks.map((item) => (
              <SidebarMenuItem key={item.to}>
                <SidebarMenuButton
                  isActive={item.to === router.state.location.pathname}
                  tooltip={item.label}
                  asChild
                >
                  <Link
                    to={item.to}
                    className="rounded-lg group-data-[collapsible=icon]:[&>span]:hidden"
                  >
                    <item.icon className="icon-sm" />
                    <span className="text-body">{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
