import { useNavigate, useRouter } from "@tanstack/react-router";
import { getContrastingColor } from "@uiw/color-convert";
import { Check, CheckLine, ChevronDown, Settings2, User } from "lucide-react";
import { useHotkeys } from "react-hotkeys-hook";

import Link from "@/components/core/link";
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
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import { toast } from "@/components/ui/toast";
import { authClient } from "@/lib/auth/auth-client";
import { app } from "@/lib/config/app.config";
import { useSettings } from "@/providers/settings-provider";
import { useTheme } from "@/providers/theme-provider";
import { Route } from "@/routes/_authenticated";

const AppSidebar = () => {
  const { deviceSessions } = Route.useLoaderData();
  const { data: session } = authClient.useSession();
  const { isMobile, toggleSidebar } = useSidebar();
  const { theme, customColors } = useTheme();
  const { settings } = useSettings();
  const navigate = useNavigate();
  const router = useRouter();

  const signIn = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/accounts",
      });
    } catch (err) {
      console.error("Failed to sign in:", err);
    }
  };

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

  const handleAccountSwitch = async (token: string | null | undefined) => {
    if (!token) return;
    try {
      await authClient.multiSession.setActive({ sessionToken: token });
      toast.success({
        title: "Account switched",
      });
      router.invalidate();
    } catch (err) {
      console.error("Failed to switch account:", err);
      toast.error({
        title: "Failed to switch account",
      });
    }
  };

  const contrastingForegroundColor =
    theme === "custom" && customColors?.background
      ? getContrastingColor(customColors.background)
      : undefined;

  useHotkeys("b", toggleSidebar, { description: "Toggle sidebar" }, [toggleSidebar]);

  return (
    <Sidebar side={settings.sidebarPosition}>
      <SidebarContent>
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem className="mt-1 flex w-full flex-1 items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="flex w-full flex-1 transition-none">
                  <SidebarMenuButton
                    variant="ghost"
                    size="lg"
                    className="flex w-full justify-between px-1"
                  >
                    <div className="flex items-center gap-2">
                      <Avatar role="button" className="size-7 rounded">
                        <AvatarImage
                          src={session?.user?.image || undefined}
                          alt={session?.user?.name || "User avatar"}
                          className="rounded"
                        />
                        <AvatarFallback className="rounded">
                          {session?.user?.name?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col gap-0.5 leading-none">
                        <span className="font-medium">{app.name}</span>
                      </div>
                    </div>
                    <ChevronDown className="icon-xs" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  className="w-(--radix-dropdown-menu-trigger-width)"
                  align="start"
                >
                  <DropdownMenuGroup className="space-y-0.5">
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
                              {deviceSession.user.id === session?.user.id && (
                                <Check className="icon-xs ml-auto" />
                              )}
                            </DropdownMenuItem>
                          ))}

                          <DropdownMenuSeparator />

                          <DropdownMenuItem onSelect={signIn}>Add an account...</DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>

                    <DropdownMenuItem onSelect={signOut}>Log out</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarGroup>
          <SidebarGroupLabel style={{ color: contrastingForegroundColor }}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {[
                {
                  label: "Tasks",
                  to: "/tasks",
                  icon: <CheckLine className="icon-xs" />,
                },
                {
                  label: "Preferences",
                  to: "/preferences",
                  icon: <Settings2 className="icon-xs" />,
                },
                {
                  label: "Profile",
                  to: "/profile",
                  icon: <User className="icon-xs" />,
                },
                {
                  label: "Security & access",
                  to: "/accounts",
                  icon: <User className="icon-xs" />,
                },
              ].map((item) => (
                <SidebarMenuItem key={item.to}>
                  <Link
                    to={item.to}
                    variant="ghost"
                    size="sm"
                    className="foreground flex w-full justify-start gap-2 transition-none hover:text-current"
                    onClick={isMobile ? () => toggleSidebar() : undefined}
                    style={{ color: contrastingForegroundColor }}
                  >
                    <p className="text-body">{item.label}</p>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
