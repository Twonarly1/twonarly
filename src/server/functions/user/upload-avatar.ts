import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import z from "zod";

import { r2 } from "@/lib/config/r2.config";
import { db } from "@/lib/db/db";
import { user } from "@/lib/db/schema";
import { getSession } from "@/server/functions/get-session";

export const uploadAvatar = createServerFn({ method: "POST" })
  .inputValidator(z.instanceof(FormData))
  .handler(async ({ data }) => {
    const session = await getSession();

    if (!session?.userId) {
      throw new Error("Unauthorized: No valid session");
    }

    const file = data.get("file") as File;

    if (!file || !(file instanceof File)) {
      throw new Error("Please provide a valid image file");
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.type)) {
      throw new Error("Invalid file type. Only JPEG, PNG, and WebP are allowed");
    }

    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      throw new Error("File size must be less than 5MB");
    }

    // Delete old R2 object if exists
    const [currentUser] = await db
      .select({ image: user.image })
      .from(user)
      .where(eq(user.id, session.userId));

    if (currentUser?.image?.includes(process.env.R2_PUBLIC_URL!)) {
      const oldKey = currentUser.image.replace(`${process.env.R2_PUBLIC_URL}/`, "");
      await r2.send(
        new DeleteObjectCommand({
          Bucket: process.env.R2_BUCKET_NAME!,
          Key: oldKey,
        }),
      );
    }

    const ext = file.type.split("/")[1];
    const key = `avatars/${session.userId}-${crypto.randomUUID()}.${ext}`;
    const buffer = await file.arrayBuffer();

    await r2.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!,
        Key: key,
        Body: Buffer.from(buffer),
        ContentType: file.type,
      }),
    );

    const imageUrl = `${process.env.R2_PUBLIC_URL}/${key}`;

    await db
      .update(user)
      .set({ image: imageUrl, updatedAt: new Date().toISOString() })
      .where(eq(user.id, session.userId));

    return { success: true, imageUrl };
  });
