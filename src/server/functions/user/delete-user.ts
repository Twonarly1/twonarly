import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { eq } from "drizzle-orm";
import z from "zod";

import { auth } from "@/lib/config/auth.config";
import { db } from "@/lib/db/db";
import { user } from "@/lib/db/schema";
import { ensureSession } from "@/server/functions/session/ensure-session";

export const deleteUser = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string().min(1) }))
  .handler(async ({ data }) => {
    const session = await ensureSession();
    if (session.user.id !== data.id) throw new Error("Unauthorized");

    await db.delete(user).where(eq(user.id, data.id));
    await auth.api.signOut({ headers: getRequestHeaders() });
  });
