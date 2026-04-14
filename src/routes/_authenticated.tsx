import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import AppSidebar from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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

  return (
    <LayoutProvider initial={layoutSettings}>
      <SidebarProvider>
        <AppSidebar />

        <SidebarInset>
          <header className="sticky top-0 hidden shrink-0 items-center gap-2 sm:flex">
            <SidebarTrigger />
          </header>

          <Outlet />
        </SidebarInset>
      </SidebarProvider>
    </LayoutProvider>
  );
}
