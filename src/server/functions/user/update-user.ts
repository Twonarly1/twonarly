import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { eq } from "drizzle-orm";
import { minLength, object, pipe, string } from "valibot";

import { auth } from "@/lib/config/auth.config";
import { db } from "@/lib/db/db";
import { user } from "@/lib/db/schema";

export const updateUser = createServerFn({ method: "POST" })
  .inputValidator(
    object({
      name: pipe(string(), minLength(1, "Name is required")),
    }),
  )
  .handler(async ({ data }) => {
    const session = await auth.api.getSession({ headers: getRequestHeaders() });

    if (!session) {
      throw new Error("Unauthorized");
    }

    await db
      .update(user)
      .set({ name: data.name, updatedAt: new Date().toISOString() })
      .where(eq(user.id, session.user.id));
  });
