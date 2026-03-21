import { createServerFn } from "@tanstack/react-start";

import { db } from "@/lib/db/db";
import { getSession } from "@/server/functions/get-session";

export const getTasks = createServerFn({ method: "GET" })
  .inputValidator((data: { userId: string }) => data)
  .handler(async ({ data }) => {
    const session = await getSession();
    if (!session?.userId) throw new Error("Unauthorized");

    const tasks = await db.query.tasks.findMany({
      where: (tasks, { eq }) => eq(tasks.userId, data.userId),
    });

    return tasks;
  });
