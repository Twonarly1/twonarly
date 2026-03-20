import { createServerFn } from "@tanstack/react-start";

import { db } from "@/lib/db/db";

export const getTasks = createServerFn({ method: "GET" })
  .inputValidator((data: { userId: string }) => data)
  .handler(async ({ data }) => {
    const tasks = await db.query.tasks.findMany({
      where: (tasks, { eq }) => eq(tasks.userId, data.userId),
    });

    return tasks;
  });
