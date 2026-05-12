import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { maxLength, minLength, object, pipe, string } from "valibot";

import { auth } from "@/lib/auth/auth.config";
import { db } from "@/lib/db";
import { tasks } from "@/lib/db/schema";

const addTaskInput = object({
  name: pipe(string(), minLength(1, "Name is required"), maxLength(256)),
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
      description: "",
      userId: session.user.id,
    });
  });
