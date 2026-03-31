import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import AppSidebar from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useSettings } from "@/providers/settings-provider";
import { getDeviceSessions } from "@/server/functions/session/get-device-sessions";
import { getSession } from "@/server/functions/session/get-session";

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async () => {
    const session = await getSession();
    if (!session) throw redirect({ to: "/" });

    const deviceSessions = await getDeviceSessions();
    return { user: session.user, deviceSessions };
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { settings } = useSettings();
  const sidebarPosition = settings.sidebarPosition || "left";

  return (
    <div className="flex min-h-dvh w-full">
      <SidebarProvider>
        {sidebarPosition === "left" && <AppSidebar />}

        <SidebarInset className={cn("bg-sidebar transition-transform duration-500")}>
          <main className="flex-1 gap-0 overflow-hidden rounded-lg">
            <div className="h-full w-full rounded-lg border bg-background">
              <SidebarTrigger />

              <Outlet />
            </div>
          </main>
        </SidebarInset>

        {sidebarPosition === "right" && <AppSidebar />}
      </SidebarProvider>
    </div>
  );
}
