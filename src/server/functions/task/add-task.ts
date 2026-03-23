import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import z from "zod";

import { db } from "@/lib/db/db";
import { tasks } from "@/lib/db/schema";
import { getSession } from "@/server/functions/session/get-session";

export const addTask = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      name: z.string().min(1, "Name is required"),
      description: z.string(),
      completed: z.boolean().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const session = await getSession();
    if (!session?.userId) throw new Error("Unauthorized");

    await db.insert(tasks).values({
      ...data,
      userId: session.userId,
    });

    throw redirect({ to: "/tasks" });
  });
