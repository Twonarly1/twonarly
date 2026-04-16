import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

import { auth } from "@/lib/config/auth.config";
import { db } from "@/lib/db/db";

export const fetchTasks = createServerFn({ method: "GET" }).handler(async () => {
  const session = await auth.api.getSession({ headers: getRequestHeaders() });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const tasks = await db.query.tasks.findMany({
    where: (tasks, { eq }) => eq(tasks.userId, session.user.id),
  });

  return tasks;
});
