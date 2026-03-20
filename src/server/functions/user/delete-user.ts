import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import z from "zod";

import { db } from "@/lib/db/db";
import { user } from "@/lib/db/schema";

export const deleteUser = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string().min(1) }))
  .handler(async ({ data }) => {
    await db.delete(user).where(eq(user.id, data.id));

    return { error: false };
  });
