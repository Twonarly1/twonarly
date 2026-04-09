import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import AppSidebar from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
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
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2">
          <div className="flex flex-1 items-center gap-2 px-2">
            <SidebarTrigger />
            {/* <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbPage className="line-clamp-1">Tasks</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb> */}
          </div>
          {/* <div className="ml-auto flex items-center gap-2 px-3">
            <Button variant="ghost" size="icon-sm">
              <Star className="icon-sm" />
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon-sm">
                  <MoreHorizontal className="icon-sm" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56 overflow-hidden rounded-lg p-0" align="end">
                todo
              </PopoverContent>
            </Popover>
          </div> */}
        </header>

        <Outlet />
      </SidebarInset>
    </SidebarProvider>
  );
}
