import { useNavigate, useRouter } from "@tanstack/react-router";
import clsx from "clsx";
import { LogOut, PanelLeft } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { signOut } from "@/lib/auth/auth-client";
import { app } from "@/lib/config/app.config";
import { navLinks } from "@/lib/constants/nav-links";
import { useLayout } from "@/providers/layout-provider";
import Link from "./core/link";
import { Button } from "./ui/button";
import { Kbd } from "./ui/kbd";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

const AppSidebar = () => {
  const navigate = useNavigate();
  const router = useRouter();
  const { layout } = useLayout();
  const { state, toggleSidebar, isMobile } = useSidebar();

  const handleSignOut = async () => {
    await signOut();
    await navigate({ to: "/" });
  };

  return (
    <Sidebar>
      <SidebarGroup>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center justify-between">
              <div className="px-2 font-medium text-lg group-data-[collapsible=icon]:hidden">
                <a href="/">{app.name}</a>
              </div>
              <Tooltip delayDuration={500}>
                <TooltipTrigger asChild>
                  <Button
                    variant="sidebar"
                    size="icon"
                    onClick={toggleSidebar}
                    className={clsx("w-fit!", layout.sidebarCollapsible === "none" && "invisible")}
                  >
                    <PanelLeft className="icon-sm" />

                    <span className="sr-only">Toggle Sidebar</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent
                  side={layout.sidebarPosition === "right" ? "left" : "right"}
                  sideOffset={16}
                >
                  {state === "collapsed" ? "Expand sidebar" : "Collapse sidebar"}
                  <Kbd>B</Kbd>
                </TooltipContent>
              </Tooltip>
            </div>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarMenu>
            {navLinks.slice(1, navLinks.length).map((item) => (
              <SidebarMenuItem key={item.to}>
                <Tooltip delayDuration={500}>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.to}
                      data-active={item.to === router.state.location.pathname}
                      variant="sidebar"
                      size="icon"
                    >
                      <item.icon className="icon-sm" />
                      <span className="text-base">{item.label}</span>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent
                    side="right"
                    align="center"
                    sideOffset={16}
                    hidden={state !== "collapsed" || isMobile}
                  >
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <Tooltip delayDuration={500}>
          <TooltipTrigger asChild>
            <Button variant="sidebar" size="icon" onClick={handleSignOut}>
              <LogOut className="icon-sm" />
              <span className="text-base">Logout</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent
            side="right"
            align="center"
            sideOffset={16}
            hidden={state !== "collapsed" || isMobile}
          >
            Logout
          </TooltipContent>
        </Tooltip>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
