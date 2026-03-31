import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import z from "zod";

import { db } from "@/lib/db/db";
import { tasks } from "@/lib/db/schema";
import { ensureSession } from "@/server/functions/session/ensure-session";

export const deleteTask = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string().min(1) }))
  .handler(async ({ data }) => {
    const session = await ensureSession();

    await db.delete(tasks).where(and(eq(tasks.id, data.id), eq(tasks.userId, session.user.id)));
  });
