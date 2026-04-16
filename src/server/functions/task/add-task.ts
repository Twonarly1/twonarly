import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import z from "zod";

import { auth } from "@/lib/config/auth.config";
import { db } from "@/lib/db/db";
import { tasks } from "@/lib/db/schema";

export const addTask = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      name: z.string().min(1, "Name is required"),
      description: z.string(),
      completed: z.boolean().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const session = await auth.api.getSession({ headers: getRequestHeaders() });

    if (!session) {
      throw new Error("Unauthorized");
    }

    await db.insert(tasks).values({
      ...data,
      userId: session.user.id,
    });

    throw redirect({ to: "/tasks" });
  });
