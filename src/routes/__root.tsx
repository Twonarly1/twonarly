import { HeadContent, Outlet, Scripts, createRootRouteWithContext } from "@tanstack/react-router";

import { Toaster } from "@/components/ui/toast";
import { app } from "@/lib/config/app.config";
import { AppearanceProvider } from "@/providers/appearance-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { getAppearance } from "@/server/functions/preferences/appearance";
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

const HEX_COLOR_RE = /^#[0-9a-fA-F]{6}$/;

/** Only returns the value if it's a valid 6-digit hex color, otherwise empty string. */
function safeHex(value: string | undefined): string {
  return value && HEX_COLOR_RE.test(value) ? value : "";
}

export const Route = createRootRouteWithContext<RouterContext>()({
  loader: async () => {
    const [theme, customColors, appearance] = await Promise.all([
      getTheme(),
      getCustomColors(),
      getAppearance(),
    ]);
    return { theme, customColors, appearance };
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
  const { theme, customColors, appearance } = Route.useLoaderData();

  // Build className for html element
  const htmlClassName = [theme, appearance.usePointerCursor ? "pointer-cursor" : ""]
    .filter(Boolean)
    .join(" ");

  // Build data attributes
  const htmlDataAttrs =
    appearance.fontSize !== "default" ? { "data-font-size": appearance.fontSize } : {};

  // Validate colors before interpolating into the inline script
  const safeBg = safeHex(customColors?.background);
  const safeAccent = safeHex(customColors?.accent);
  const safeBorder = safeHex(customColors?.border);

  const themeScript =
    theme === "custom" && (safeBg || safeAccent || safeBorder)
      ? `(function(){
        var r=document.documentElement.style;
        var bg="${safeBg}";
        var accent="${safeAccent}";
        var border="${safeBorder}";
        function hex2rgb(h){h=h.replace("#","");return{r:parseInt(h.substring(0,2),16),g:parseInt(h.substring(2,4),16),b:parseInt(h.substring(4,6),16)};}
        function adj(h,p){var c=hex2rgb(h),R=c.r,G=c.g,B=c.b;if(p>=0){R=Math.min(255,Math.floor(R+(255-R)*(p/100)));G=Math.min(255,Math.floor(G+(255-G)*(p/100)));B=Math.min(255,Math.floor(B+(255-B)*(p/100)));}else{var f=Math.abs(p)/100;R=Math.max(0,Math.floor(R*(1-f)));G=Math.max(0,Math.floor(G*(1-f)));B=Math.max(0,Math.floor(B*(1-f)));}var t=function(n){return n.toString(16).padStart(2,"0");};return"#"+t(R)+t(G)+t(B);}
        function isDark(h){var c=hex2rgb(h);return(0.299*c.r+0.587*c.g+0.114*c.b)/255<0.5;}
        if(bg){var d=isDark(bg);r.setProperty("--sidebar",bg);r.setProperty("--background",adj(bg,80));r.setProperty("--sidebar-accent",d?adj(bg,15):adj(bg,-10));r.setProperty("--sidebar-foreground",d?"#ffffff":"#1a1a1a");}
        if(accent){r.setProperty("--primary",accent);}
        if(border){r.setProperty("--border",border);}
      })();`
      : undefined;

  return (
    <html lang="en" className={htmlClassName} {...htmlDataAttrs}>
      <head>
        <HeadContent />
        {themeScript && (
          // biome-ignore lint/security/noDangerouslySetInnerHtml: Safe — values validated against /^#[0-9a-fA-F]{6}$/
          <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        )}
      </head>
      <body className="flex min-h-dvh w-full">
        <ThemeProvider theme={theme} customColors={customColors}>
          <AppearanceProvider initial={appearance}>
            {children}
            <Toaster richColors />
          </AppearanceProvider>
        </ThemeProvider>

        <Scripts />
      </body>
    </html>
  );
}
