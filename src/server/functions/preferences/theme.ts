import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import { z } from "zod";

import { COOKIES } from "@/lib/constants/cookies";

const themeValidator = z.union([
  z.literal("light"),
  z.literal("dark"),
  z.literal("system"),
  z.literal("custom"),
]);

const customColorsValidator = z.object({
  background: z.string().optional(),
  accent: z.string().optional(),
  border: z.string().optional(),
});

const storageKey = COOKIES.theme;
const customColorsKey = COOKIES.themeCustom;

export type Theme = z.infer<typeof themeValidator>;
export type CustomColors = z.infer<typeof customColorsValidator>;

export const getTheme = createServerFn().handler(
  async () => (getCookie(storageKey) || "dark") as Theme,
);

export const getCustomColors = createServerFn().handler(async () => {
  const colors = getCookie(customColorsKey);
  return colors ? (JSON.parse(colors) as CustomColors) : null;
});

export const setTheme = createServerFn({ method: "POST" })
  .inputValidator(themeValidator)
  .handler(async ({ data }) => setCookie(storageKey, data));

export const setCustomColors = createServerFn({ method: "POST" })
  .inputValidator(customColorsValidator)
  .handler(async ({ data }) => setCookie(customColorsKey, JSON.stringify(data)));
