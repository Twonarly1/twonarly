import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { eq } from "drizzle-orm";
import z from "zod";

import { auth } from "@/lib/config/auth.config";
import { db } from "@/lib/db/db";
import { user } from "@/lib/db/schema";
import { getSession } from "@/server/functions/get-session";

export const deleteUser = createServerFn({ method: "POST" })
  .inputValidator(z.object({ id: z.string().min(1) }))
  .handler(async ({ data }) => {
    const session = await getSession();

    if (!session?.userId || session.userId !== data.id) {
      throw new Error("Unauthorized: No valid session");
    }

    await db.delete(user).where(eq(user.id, data.id));
    await auth.api.signOut({ headers: getRequestHeaders() });

    return { error: false };
  });
