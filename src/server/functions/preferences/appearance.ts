import { createServerFn } from "@tanstack/react-start";
import { getCookie, setCookie } from "@tanstack/react-start/server";
import { z } from "zod";

import { COOKIES } from "@/lib/constants/cookies";

const fontSizeSchema = z.enum(["smaller", "small", "default", "large", "larger"]);

export const getAppearance = createServerFn().handler(async () => {
  const fontSize = (getCookie(COOKIES.fontSize) || "default") as z.infer<typeof fontSizeSchema>;
  const usePointerCursor = getCookie(COOKIES.pointerCursor) === "true";

  return { fontSize, usePointerCursor };
});

export const setAppearance = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      fontSize: fontSizeSchema.optional(),
      usePointerCursor: z.boolean().optional(),
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
