import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { eq } from "drizzle-orm";

import { auth } from "@/lib/config/auth.config";
import { R2_ENDPOINT, r2 } from "@/lib/config/r2.config";
import { env } from "@/lib/config/t3.config";
import { db } from "@/lib/db/db";
import { user } from "@/lib/db/schema";
import { rateLimit } from "@/server/rate-limit";

export const removeAvatar = createServerFn({ method: "POST" })
  .middleware([rateLimit({ key: "remove-avatar", limit: 5, window: 60 })])
  .handler(async () => {
    const session = await auth.api.getSession({
      headers: getRequestHeaders(),
    });

    if (!session) {
      throw new Error("Unauthorized");
    }

    try {
      const [currentUser] = await db
        .select({ image: user.image })
        .from(user)
        .where(eq(user.id, session.user.id));

      if (currentUser?.image) {
        const key = currentUser.image.replace(`${env.R2_PUBLIC_URL}/`, "");
        await r2.fetch(`${R2_ENDPOINT}/${env.R2_BUCKET_NAME}/${key}`, {
          method: "DELETE",
        });
      }

      await db
        .update(user)
        .set({ image: null, updatedAt: new Date().toISOString() })
        .where(eq(user.id, session.user.id));

      await auth.api.updateUser({
        headers: getRequestHeaders(),
        body: { image: null },
      });

      return { success: true };
    } catch (error) {
      console.error("Failed to remove avatar:", error);
      throw new Error("Failed to remove avatar");
    }
  });
