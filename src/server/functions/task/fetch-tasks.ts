import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { isNotNull, isNull } from "drizzle-orm";
import { boolean, object, optional } from "valibot";

import { auth } from "@/lib/config/auth.config";
import { db } from "@/lib/db/db";

export const fetchTasks = createServerFn({ method: "GET" })
  .inputValidator(object({ archived: optional(boolean()) }))
  .handler(async ({ data }) => {
    const session = await auth.api.getSession({ headers: getRequestHeaders() });

    if (!session) {
      throw new Error("Unauthorized");
    }

    const tasks = await db.query.tasks.findMany({
      where: (tasks, { eq, and }) =>
        and(
          eq(tasks.userId, session.user.id),
          data.archived ? isNotNull(tasks.archivedAt) : isNull(tasks.archivedAt),
        ),
    });

    return tasks;
  });
