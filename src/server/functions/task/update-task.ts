import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { and, eq } from "drizzle-orm";
import z from "zod";

import { auth } from "@/lib/config/auth.config";
import { db } from "@/lib/db/db";
import { tasks } from "@/lib/db/schema";

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
    const session = await auth.api.getSession({ headers: getRequestHeaders() });

    if (!session) {
      throw new Error("Unauthorized");
    }

    await db
      .update(tasks)
      .set(data)
      .where(and(eq(tasks.id, data.id), eq(tasks.userId, session.user.id)));
  });
