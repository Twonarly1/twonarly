import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { eq } from "drizzle-orm";
import { object, optional, picklist } from "valibot";

import { auth } from "@/lib/config/auth.config";
import { db } from "@/lib/db/db";
import { userSettings } from "@/lib/db/schema";

export const fetchLayout = createServerFn({ method: "GET" }).handler(async () => {
  const session = await auth.api.getSession({ headers: getRequestHeaders() });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const settings = await db.query.userSettings.findFirst({
    where: eq(userSettings.userId, session.user.id),
  });

  return settings ?? null;
});

export const updateLayout = createServerFn({ method: "POST" })
  .inputValidator(
    object({
      sidebarPosition: optional(picklist(["left", "right"])),
      sidebarVariant: optional(picklist(["classic", "floating", "inset"])),
      sidebarCollapsible: optional(picklist(["offcanvas", "icon", "none"])),
    }),
  )
  .handler(async ({ data }) => {
    const session = await auth.api.getSession({ headers: getRequestHeaders() });

    if (!session) {
      throw new Error("Unauthorized");
    }
    await db
      .insert(userSettings)
      .values({ userId: session.user.id, ...data })
      .onConflictDoUpdate({
        target: userSettings.userId,
        set: { ...data, updatedAt: new Date().toISOString() },
      });
  });
