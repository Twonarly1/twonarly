import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { eq } from "drizzle-orm";

import { auth } from "@/lib/config/auth.config";
import { r2 } from "@/lib/config/r2.config";
import { db } from "@/lib/db/db";
import { user } from "@/lib/db/schema";

export const removeAvatar = createServerFn({ method: "POST" }).handler(async () => {
  const session = await auth.api.getSession({ headers: getRequestHeaders() });

  if (!session) {
    throw new Error("Unauthorized");
  }

  try {
    const [currentUser] = await db
      .select({ image: user.image })
      .from(user)
      .where(eq(user.id, session.user.id));

    if (currentUser?.image) {
      const key = currentUser.image.replace(`${process.env.R2_PUBLIC_URL}/`, "");
      await r2.send(
        new DeleteObjectCommand({
          Bucket: process.env.R2_BUCKET_NAME,
          Key: key,
        }),
      );
    }

    await db
      .update(user)
      .set({ image: null, updatedAt: new Date().toISOString() })
      .where(eq(user.id, session.user.id));

    return { success: true };
  } catch (error) {
    console.error("Failed to remove avatar:", error);
    throw new Error("Failed to remove avatar");
  }
});
