import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";

import { db } from "@/lib/db/db";
import { tasks } from "@/lib/db/schema";
import { ensureSession } from "@/server/functions/session/ensure-session";

export const addTask = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      name: z.string().min(1, "Name is required"),
      description: z.string(),
      completed: z.boolean().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const session = await ensureSession();

    await db.insert(tasks).values({
      ...data,
      userId: session.user.id,
    });

    throw redirect({ to: "/tasks" });
  });
