import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import { z } from "zod";

import { COOKIES } from "@/lib/constants/cookies";

const fontSizeValidator = z.enum(["smaller", "small", "default", "large", "larger"]);
const sidebarPositionValidator = z.enum(["left", "right"]);
const sidebarVariantValidator = z.enum(["classic", "floating", "inset"]);
const sidebarCollapsibleValidator = z.enum(["offcanvas", "icon", "none"]);

const settingsValidator = z.object({
  fontSize: fontSizeValidator,
  usePointerCursor: z.boolean(),
  sidebarPosition: sidebarPositionValidator,
  sidebarVariant: sidebarVariantValidator,
  sidebarCollapsible: sidebarCollapsibleValidator,
});

const fontSizeStorageKey = COOKIES.fontSize;
const pointerCursorStorageKey = COOKIES.pointerCursor;
const sidebarPositionStorageKey = COOKIES.sidebarPosition;
const sidebarVariantStorageKey = COOKIES.sidebarVariant;
const sidebarCollapsibleStorageKey = COOKIES.sidebarCollapsible;

type Settings = z.infer<typeof settingsValidator>;

export const getSettings = createServerFn().handler(async () => {
  const fontSize = (getCookie(fontSizeStorageKey) || "default") as z.infer<
    typeof fontSizeValidator
  >;
  const usePointerCursor = getCookie(pointerCursorStorageKey) === "true";

  const sidebarPosition = (getCookie(sidebarPositionStorageKey) || "left") as z.infer<
    typeof sidebarPositionValidator
  >;

  const sidebarVariant = (getCookie(sidebarVariantStorageKey) || "inset") as z.infer<
    typeof sidebarVariantValidator
  >;

  const sidebarCollapsible = (getCookie(sidebarCollapsibleStorageKey) || "none") as z.infer<
    typeof sidebarCollapsibleValidator
  >;

  return {
    fontSize,
    usePointerCursor,
    sidebarPosition,
    sidebarVariant,
    sidebarCollapsible,
  } satisfies Settings;
});

export const setSettings = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      fontSize: fontSizeValidator.optional(),
      usePointerCursor: z.boolean().optional(),
      sidebarPosition: sidebarPositionValidator.optional(),
      sidebarVariant: sidebarVariantValidator.optional(),
      sidebarCollapsible: sidebarCollapsibleValidator.optional(),
    }),
  )
  .handler(async ({ data }) => {
    if (data.fontSize !== undefined) {
      setCookie(fontSizeStorageKey, data.fontSize);
    }
    if (data.usePointerCursor !== undefined) {
      setCookie(pointerCursorStorageKey, data.usePointerCursor.toString());
    }
    if (data.sidebarPosition !== undefined) {
      setCookie(sidebarPositionStorageKey, data.sidebarPosition);
    }
    if (data.sidebarVariant !== undefined) {
      setCookie(sidebarVariantStorageKey, data.sidebarVariant);
    }
    if (data.sidebarCollapsible !== undefined) {
      setCookie(sidebarCollapsibleStorageKey, data.sidebarCollapsible);
    }
  });
