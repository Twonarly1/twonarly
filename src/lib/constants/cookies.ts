import { app } from "@/lib/config/app.config";

export const COOKIES = {
  theme: `${app.name.toLowerCase()}.theme`,
  themeCustom: `${app.name.toLowerCase()}.theme.custom`,
  sidebar: `${app.name.toLowerCase()}.sidebar.state`,
  fontSize: `${app.name.toLowerCase()}.settings.fontSize`,
  pointerCursor: `${app.name.toLowerCase()}.settings.pointerCursor`,
  sidebarPosition: `${app.name.toLowerCase()}.settings.sidebarPosition`,
} as const;
