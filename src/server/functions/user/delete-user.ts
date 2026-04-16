import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import z from "zod";

import { db } from "@/lib/db/db";
import { user } from "@/lib/db/schema";
import { ensureSession } from "@/server/functions/session/ensure-session";

export const deleteUser = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string().min(1) }))
  .handler(async ({ data }) => {
    const session = await ensureSession();

    if (session.user.id !== data.id) throw new Error("Unauthorized");

    await db.delete(user).where(eq(user.id, data.id));
  });
