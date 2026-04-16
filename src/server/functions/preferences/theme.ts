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

const hexColor = z
  .string()
  .regex(/^#[0-9a-fA-F]{6}$/, "Must be a valid hex color (e.g. #ff00aa)")
  .optional();

const customColorsValidator = z.object({
  background: hexColor,
  accent: hexColor,
  border: hexColor,
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
  if (!colors) return null;

  try {
    const parsed = customColorsValidator.parse(JSON.parse(colors));
    return parsed;
  } catch {
    return null;
  }
});

export const setTheme = createServerFn({ method: "POST" })
  .inputValidator(themeValidator)
  .handler(async ({ data }) => setCookie(storageKey, data));

export const setCustomColors = createServerFn({ method: "POST" })
  .inputValidator(customColorsValidator)
  .handler(async ({ data }) => setCookie(customColorsKey, JSON.stringify(data)));
