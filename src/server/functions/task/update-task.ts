import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import z from "zod";

import { db } from "@/lib/db/db";
import { tasks } from "@/lib/db/schema";
import { ensureSession } from "@/server/functions/session/ensure-session";

export const updateTask = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      id: z.string().min(1),
      name: z.string().min(1, "Name is required"),
      description: z.string().optional(),
      completed: z.boolean().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const session = await ensureSession();

    await db
      .update(tasks)
      .set(data)
      .where(and(eq(tasks.id, data.id), eq(tasks.userId, session.user.id)));
  });
