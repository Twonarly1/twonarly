import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import { number, object, optional, parse, picklist, record, string, tuple } from "valibot";

import { COOKIES } from "@/lib/constants/cookies";

import type { InferOutput } from "valibot";

const themeValidator = picklist(["light", "dark", "system", "custom"]);
const lchTuple = tuple([number(), number(), number()]);

const customThemeValidator = object({
  base: optional(lchTuple),
  accent: optional(lchTuple),
  contrast: optional(number()),
  sidebar: optional(
    object({
      base: optional(lchTuple),
      contrast: optional(number()),
    }),
  ),
});

const preferencesValidator = object({
  theme: themeValidator,
  customTheme: optional(customThemeValidator),
  css: optional(record(string(), string())),
});

export type Theme = InferOutput<typeof themeValidator>;
export type CustomTheme = InferOutput<typeof customThemeValidator>;
export type ThemePreferences = InferOutput<typeof preferencesValidator>;

const COOKIE_KEY = COOKIES.theme;

export const getThemePreferences = createServerFn().handler(async (): Promise<ThemePreferences> => {
  const raw = getCookie(COOKIE_KEY);
  if (!raw) return { theme: "system" };

  try {
    return parse(preferencesValidator, JSON.parse(raw));
  } catch {
    // Backwards compat: bare theme string
    if (["light", "dark", "system", "custom"].includes(raw!)) {
      return { theme: raw as Theme };
    }
    return { theme: "system" };
  }
});

export const setThemePreferences = createServerFn({ method: "POST" })
  .inputValidator(preferencesValidator)
  .handler(async ({ data }) => {
    setCookie(COOKIE_KEY, JSON.stringify(data));
  });
