import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import z from "zod";

import { db } from "@/lib/db/db";
import { tasks } from "@/lib/db/schema";

export const deleteTask = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string().min(1) }))
  .handler(async ({ data }) => {
    await db.delete(tasks).where(eq(tasks.id, data.id));

    return { error: false };
  });
