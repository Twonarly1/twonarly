import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { eq } from "drizzle-orm";
import { fileTypeFromBuffer } from "file-type";
import z from "zod";

import { auth } from "@/lib/config/auth.config";
import { r2 } from "@/lib/config/r2.config";
import { env } from "@/lib/config/t3.config";
import { db } from "@/lib/db/db";
import { user } from "@/lib/db/schema";

const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_SIZE = 5 * 1024 * 1024;

export const uploadAvatar = createServerFn({ method: "POST" })
  .inputValidator(z.instanceof(FormData))
  .handler(async ({ data }) => {
    const session = await auth.api.getSession({ headers: getRequestHeaders() });

    if (!session) {
      throw new Error("Unauthorized");
    }

    const file = data.get("file") as File;

    if (!file || !(file instanceof File)) {
      throw new Error("Please provide a valid image file");
    }

    if (file.size > MAX_SIZE) {
      throw new Error("File size must be less than 5MB");
    }

    const buffer = await file.arrayBuffer();
    const detected = await fileTypeFromBuffer(buffer);

    if (!detected || !ALLOWED_TYPES.includes(detected.mime)) {
      throw new Error("Invalid file type. Only JPEG, PNG, and WebP are allowed");
    }

    // Delete old R2 object if exists
    const [currentUser] = await db
      .select({ image: user.image })
      .from(user)
      .where(eq(user.id, session.user.id));

    if (currentUser?.image?.includes(env.R2_PUBLIC_URL)) {
      const oldKey = currentUser.image.replace(`${env.R2_PUBLIC_URL}/`, "");
      await r2.send(
        new DeleteObjectCommand({
          Bucket: process.env.R2_BUCKET_NAME,
          Key: oldKey,
        }),
      );
    }

    const key = `avatars/${session.user.id}-${crypto.randomUUID()}.${detected.ext}`;

    await r2.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
        Body: Buffer.from(buffer),
        ContentType: detected.mime,
      }),
    );

    const imageUrl = `${env.R2_PUBLIC_URL}/${key}`;

    await db
      .update(user)
      .set({ image: imageUrl, updatedAt: new Date().toISOString() })
      .where(eq(user.id, session.user.id));
  });
