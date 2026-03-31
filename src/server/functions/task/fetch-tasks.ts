import { createServerFn } from "@tanstack/react-start";

import { db } from "@/lib/db/db";
import { ensureSession } from "@/server/functions/session/ensure-session";

export const fetchTasks = createServerFn({ method: "GET" }).handler(async () => {
  const session = await ensureSession();

  const tasks = await db.query.tasks.findMany({
    where: (tasks, { eq }) => eq(tasks.userId, session.user.id),
  });

  return tasks;
});
