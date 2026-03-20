import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import z from "zod";

import { db } from "@/lib/db/db";
import { tasks } from "@/lib/db/schema";

export const toggleIsComplete = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      id: z.string().min(1),
      completed: z.boolean(),
    }),
  )
  .handler(async ({ data }) => {
    await db.update(tasks).set({ completed: data.completed }).where(eq(tasks.id, data.id));

    return { error: false };
  });
