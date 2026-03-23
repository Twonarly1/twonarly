import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import z from "zod";

import { db } from "@/lib/db/db";
import { tasks } from "@/lib/db/schema";
import { getSession } from "@/server/functions/session/get-session";

export const deleteTask = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string().min(1) }))
  .handler(async ({ data }) => {
    const session = await getSession();
    if (!session?.userId) throw new Error("Unauthorized");

    await db.delete(tasks).where(and(eq(tasks.id, data.id), eq(tasks.userId, session.userId)));
  });
