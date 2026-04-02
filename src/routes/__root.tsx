import { TanStackDevtools } from "@tanstack/react-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import { Toaster } from "@/components/ui/toast";
import { app } from "@/lib/config/app.config";
import { SettingsProvider } from "@/providers/settings-provider";
import ThemeProvider from "@/providers/theme-provider";
import { getSettings } from "@/server/functions/preferences/settings";
import { getCustomColors, getTheme } from "@/server/functions/preferences/theme";
import appCss from "../styles.css?url";

import type { QueryClient } from "@tanstack/react-query";
import type { Session, User } from "better-auth";
import type { PropsWithChildren } from "react";

interface RouterContext {
  queryClient: QueryClient;
  session: Session | null;
  user: User | undefined;
}

export const Route = createRootRouteWithContext<RouterContext>()({
  loader: async () => {
    const theme = await getTheme();
    const customColors = await getCustomColors();
    const settings = await getSettings();

    return { theme, customColors, settings };
  },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: app.name },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: PropsWithChildren) {
  const { theme, customColors, settings } = Route.useLoaderData();

  // Build className for html element
  const htmlClassName = [theme, settings.usePointerCursor ? "pointer-cursor" : ""]
    .filter(Boolean)
    .join(" ");

  // Build data attributes
  const htmlDataAttrs =
    settings.fontSize !== "default" ? { "data-font-size": settings.fontSize } : {};

  return (
    <html lang="en" className={htmlClassName} {...htmlDataAttrs}>
      <head>
        <HeadContent />
      </head>
      <body>
        {/* TODO: Handle providers better along with context wrap in router.tsx */}
        <ThemeProvider theme={theme} customColors={customColors}>
          <SettingsProvider settings={settings}>
            {children}
            <Toaster richColors />
          </SettingsProvider>
        </ThemeProvider>

        <TanStackDevtools
          plugins={[
            {
              name: "TanStack Query",
              render: <ReactQueryDevtoolsPanel />,
              defaultOpen: true,
            },
            {
              name: "TanStack Router",
              render: <TanStackRouterDevtoolsPanel />,
              defaultOpen: false,
            },
          ]}
        />
        <Scripts />
      </body>
    </html>
  );
}
