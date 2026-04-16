import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { eq } from "drizzle-orm";
import { z } from "zod";

import { auth } from "@/lib/config/auth.config";
import { db } from "@/lib/db/db";
import { userSettings } from "@/lib/db/schema";
import { ensureSession } from "@/server/functions/session/ensure-session";

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
    z.object({
      sidebarPosition: z.enum(["left", "right"]).optional(),
      sidebarVariant: z.enum(["classic", "floating", "inset"]).optional(),
      sidebarCollapsible: z.enum(["offcanvas", "icon", "none"]).optional(),
    }),
  )
  .handler(async ({ data }) => {
    const session = await ensureSession();

    await db
      .insert(userSettings)
      .values({ userId: session.user.id, ...data })
      .onConflictDoUpdate({
        target: userSettings.userId,
        set: { ...data, updatedAt: new Date().toISOString() },
      });
  });
