import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { eq } from "drizzle-orm";
import { minLength, object, pipe, string } from "valibot";

import { auth } from "@/lib/config/auth.config";
import { db } from "@/lib/db/db";
import { user } from "@/lib/db/schema";

export const deleteUser = createServerFn({ method: "POST" })
  .inputValidator(object({ id: pipe(string(), minLength(1)) }))
  .handler(async ({ data }) => {
    const session = await auth.api.getSession({ headers: getRequestHeaders() });

    if (!session) {
      throw new Error("Unauthorized");
    }

    if (session.user.id !== data.id) throw new Error("Unauthorized");

    await db.delete(user).where(eq(user.id, data.id));
  });
