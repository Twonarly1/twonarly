import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import { z } from "zod";

const fontSizeValidator = z.enum(["smaller", "small", "default", "large", "larger"]);
const sidebarPositionValidator = z.enum(["left", "right"]);

const settingsValidator = z.object({
  fontSize: fontSizeValidator,
  usePointerCursor: z.boolean(),
  sidebarPosition: sidebarPositionValidator,
});

const fontSizeStorageKey = "_preferred-font-size";
const pointerCursorStorageKey = "_use-pointer-cursor";
const sidebarPositionStorageKey = "_sidebar-position";

type Settings = z.infer<typeof settingsValidator>;

export const getSettings = createServerFn().handler(async () => {
  const fontSize = (getCookie(fontSizeStorageKey) || "default") as z.infer<
    typeof fontSizeValidator
  >;
  const usePointerCursor = getCookie(pointerCursorStorageKey) === "true";

  const sidebarPosition = (getCookie(sidebarPositionStorageKey) || "left") as z.infer<
    typeof sidebarPositionValidator
  >;

  return {
    fontSize,
    usePointerCursor,
    sidebarPosition,
  } satisfies Settings;
});

export const setSettings = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      fontSize: fontSizeValidator.optional(),
      usePointerCursor: z.boolean().optional(),
      sidebarPosition: sidebarPositionValidator.optional(),
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
  });
