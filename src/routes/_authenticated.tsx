import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import AppSidebar from "@/components/app-sidebar";
import MobileBottomNav from "@/components/mobile-nav";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useIsPhone } from "@/lib/hooks/use-phone";
import { LayoutProvider } from "@/providers/layout-provider";
import { fetchLayout } from "@/server/functions/preferences/layout";
import { getDeviceSessions } from "@/server/functions/session/get-device-sessions";
import { getSession } from "@/server/functions/session/get-session";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => {
    const session = await getSession();
    if (!session) throw redirect({ to: "/" });

    const [deviceSessions, layoutSettings] = await Promise.all([
      getDeviceSessions(),
      fetchLayout(),
    ]);

    return { user: session.user, deviceSessions, layoutSettings };
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { layoutSettings } = Route.useRouteContext();
  const isPhone = useIsPhone();

  return (
    <LayoutProvider initial={layoutSettings}>
      <TooltipProvider delayDuration={400} skipDelayDuration={300}>
        {isPhone ? <PhoneLayout /> : <DesktopLayout />}
      </TooltipProvider>
    </LayoutProvider>
  );
}

function PhoneLayout() {
  return (
    <div className="flex min-h-svh w-full flex-col">
      <div className="flex-1">
        <Outlet />
      </div>
      <MobileBottomNav />
    </div>
  );
}

function DesktopLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="shrink-0 items-center gap-2">
          <SidebarTrigger />
        </header>
        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
