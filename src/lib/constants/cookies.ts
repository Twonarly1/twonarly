import { app } from "@/lib/config/app.config";

export const COOKIES = {
  theme: `${app.name.toLowerCase()}.theme`,
  sidebar: `${app.name.toLowerCase()}.sidebar.state`,
  fontSize: `${app.name.toLowerCase()}.settings.fontSize`,
  pointerCursor: `${app.name.toLowerCase()}.settings.pointerCursor`,
} as const;
