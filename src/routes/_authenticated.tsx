import { Outlet, createFileRoute } from "@tanstack/react-router";

import AppSidebar from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { authMiddleware } from "@/middleware";
import { useSettings } from "@/providers/settings-provider";
import { getDeviceSessions } from "@/server/functions/session/get-device-sessions";
import { fetchUser } from "@/server/functions/user/fetch-user";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
  server: { middleware: [authMiddleware] },
  loader: async () => ({
    deviceSessions: await getDeviceSessions(),
    user: await fetchUser(),
  }),
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
