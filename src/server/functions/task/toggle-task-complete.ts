import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import z from "zod";

import { db } from "@/lib/db/db";
import { tasks } from "@/lib/db/schema";
import { getSession } from "@/server/functions/session/get-session";

export const toggleTaskComplete = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      id: z.string().min(1),
      completed: z.boolean(),
    }),
  )
  .handler(async ({ data }) => {
    const session = await getSession();
    if (!session?.userId) throw new Error("Unauthorized");

    await db
      .update(tasks)
      .set({ completed: data.completed })
      .where(and(eq(tasks.id, data.id), eq(tasks.userId, session.userId)));
  });
