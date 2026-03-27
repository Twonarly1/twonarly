import { createServerFn } from "@tanstack/react-start";

import { db } from "@/lib/db/db";
import { getSession } from "@/server/functions/session/get-session";

export const fetchTasks = createServerFn({ method: "GET" }).handler(async () => {
  const session = await getSession();
  if (!session?.userId) throw new Error("Unauthorized");

  const tasks = await db.query.tasks.findMany({
    where: (tasks, { eq }) => eq(tasks.userId, session.userId),
  });

  return tasks;
});
