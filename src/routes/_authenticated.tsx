import { Outlet, createFileRoute } from "@tanstack/react-router";

import AppSidebar from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { authMiddleware } from "@/middleware";
import { useSettings } from "@/providers/settings-provider";
import { getDeviceSessions } from "@/server/functions/session/get-device-sessions";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
  server: { middleware: [authMiddleware] },
  loader: async () => ({
    deviceSessions: await getDeviceSessions(),
  }),
});

function AuthenticatedLayout() {
  const { settings } = useSettings();
  const sidebarPosition = settings.sidebarPosition || "left";

  return (
    <div className="flex min-h-dvh w-full">
      <SidebarProvider>
        {sidebarPosition === "left" && <AppSidebar />}

        <SidebarInset
          className={cn(
            "bg-sidebar p-2 transition-transform duration-500",
            sidebarPosition === "left" && "md:peer-data-[state=expanded]:pl-0",
            sidebarPosition === "right" && "md:peer-data-[state=collapsed]:mr-2",
          )}
        >
          <main className="flex-1 gap-0 overflow-hidden rounded-lg">
            <div className="h-full w-full rounded-lg border bg-background">
              <SidebarTrigger
                className={cn("m-2", sidebarPosition === "right" && "ml-auto flex")}
              />

              <Outlet />
            </div>
          </main>
        </SidebarInset>

        {sidebarPosition === "right" && <AppSidebar />}
      </SidebarProvider>
    </div>
  );
}
