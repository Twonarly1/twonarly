import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";

import { r2 } from "@/lib/config/r2.config";
import { env } from "@/lib/config/t3.config";
import { db } from "@/lib/db/db";
import { user } from "@/lib/db/schema";
import { getSession } from "@/server/functions/get-session";

export const removeAvatar = createServerFn({ method: "POST" }).handler(async () => {
  const session = await getSession();
  if (!session?.userId) throw new Error("Unauthorized");

  try {
    const [currentUser] = await db
      .select({ image: user.image })
      .from(user)
      .where(eq(user.id, session.userId));

    if (currentUser?.image) {
      const key = currentUser.image.replace(`${env.R2_PUBLIC_URL}/`, "");
      await r2.send(
        new DeleteObjectCommand({
          Bucket: env.R2_BUCKET_NAME,
          Key: key,
        }),
      );
    }

    await db
      .update(user)
      .set({ image: null, updatedAt: new Date().toISOString() })
      .where(eq(user.id, session.userId));

    return { success: true };
  } catch (error) {
    console.error("Failed to remove avatar:", error);
    throw new Error("Failed to remove avatar");
  }
});
