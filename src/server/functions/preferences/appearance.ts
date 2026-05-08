import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import { boolean, object, optional, picklist, safeParse } from "valibot";

import { COOKIES } from "@/lib/constants/cookies";

import type { InferOutput } from "valibot";

const fontSizeSchema = picklist(["10px", "11px", "12px", "13px", "14px"]);

export type FontSize = InferOutput<typeof fontSizeSchema>;

export const FONT_SIZES = fontSizeSchema.options;

const DEFAULT_FONT_SIZE: FontSize = "12px";

export const getAppearance = createServerFn().handler(async () => {
  const cookieValue = getCookie(COOKIES.fontSize);
  const parsed = safeParse(fontSizeSchema, cookieValue);
  const fontSize = parsed.success ? parsed.output : DEFAULT_FONT_SIZE;
  const usePointerCursor = getCookie(COOKIES.pointerCursor) === "true";

  return { fontSize, usePointerCursor };
});

export const setAppearance = createServerFn({ method: "POST" })
  .inputValidator(
    object({
      fontSize: optional(fontSizeSchema),
      usePointerCursor: optional(boolean()),
    }),
  )
  .handler(async ({ data }) => {
    if (data.fontSize !== undefined) {
      setCookie(COOKIES.fontSize, data.fontSize);
    }
    if (data.usePointerCursor !== undefined) {
      setCookie(COOKIES.pointerCursor, data.usePointerCursor.toString());
    }
  });
