import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { and, count, eq, isNotNull, isNull } from "drizzle-orm";
import { boolean, object, optional } from "valibot";

import { auth } from "@/lib/config/auth.config";
import { db } from "@/lib/db/db";
import { tasks as tasksTable } from "@/lib/db/schema";

export const fetchTasks = createServerFn({ method: "GET" })
  .inputValidator(object({ archived: optional(boolean()) }))
  .handler(async ({ data }) => {
    const session = await auth.api.getSession({ headers: getRequestHeaders() });
    if (!session) throw new Error("Unauthorized");

    const [taskList, [{ value: activeCount }], [{ value: archivedCount }]] = await Promise.all([
      db.query.tasks.findMany({
        where: (tasks, { eq, and }) =>
          and(
            eq(tasks.userId, session.user.id),
            data.archived ? isNotNull(tasks.archivedAt) : isNull(tasks.archivedAt),
          ),
      }),
      db
        .select({ value: count() })
        .from(tasksTable)
        .where(and(eq(tasksTable.userId, session.user.id), isNull(tasksTable.archivedAt))),
      db
        .select({ value: count() })
        .from(tasksTable)
        .where(and(eq(tasksTable.userId, session.user.id), isNotNull(tasksTable.archivedAt))),
    ]);

    return {
      tasks: taskList,
      counts: { active: activeCount, archived: archivedCount },
    };
  });
