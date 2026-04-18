import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { boolean, maxLength, minLength, object, optional, pipe, string } from "valibot";

import { auth } from "@/lib/config/auth.config";
import { db } from "@/lib/db/db";
import { tasks } from "@/lib/db/schema";

const addTaskInput = object({
  name: pipe(string(), minLength(1, "Name is required"), maxLength(256)),
  description: pipe(string(), maxLength(4096)),
  completed: optional(boolean()),
});

export const addTask = createServerFn({ method: "POST" })
  .inputValidator(addTaskInput)
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
