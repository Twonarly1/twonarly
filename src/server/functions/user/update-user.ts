import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import z from "zod";

import { db } from "@/lib/db/db";
import { user } from "@/lib/db/schema";
import { ensureSession } from "@/server/functions/session/ensure-session";

export const updateUser = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      name: z.string().min(1, "Name is required"),
    }),
  )
  .handler(async ({ data }) => {
    const session = await ensureSession();

    await db
      .update(user)
      .set({ name: data.name, updatedAt: new Date().toISOString() })
      .where(eq(user.id, session.user.id));
  });
