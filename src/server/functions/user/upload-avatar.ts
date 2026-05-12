import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { eq } from "drizzle-orm";
import { instance } from "valibot";

import { auth } from "@/lib/auth/auth.config";
import { R2_ENDPOINT, r2 } from "@/lib/config/r2.config";
import { env } from "@/lib/config/t3.config";
import { db } from "@/lib/db";
import { user } from "@/lib/db/schema";
import { rateLimit } from "@/server/rate-limit";

const MAX_SIZE = 5 * 1024 * 1024;

/**
 * Detect image type from magic bytes — replaces the 76 kB `file-type` package.
 * Only checks the formats we actually allow.
 */
function detectImageType(buf: ArrayBuffer): { mime: string; ext: string } | null {
  const bytes = new Uint8Array(buf);

  // JPEG: FF D8 FF
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return { mime: "image/jpeg", ext: "jpg" };
  }

  // PNG: 89 50 4E 47
  if (bytes[0] === 0x89 && bytes[1] === 0x50 && bytes[2] === 0x4e && bytes[3] === 0x47) {
    return { mime: "image/png", ext: "png" };
  }

  // WebP: RIFF....WEBP
  if (
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return { mime: "image/webp", ext: "webp" };
  }

  return null;
}

export const uploadAvatar = createServerFn({ method: "POST" })
  .middleware([rateLimit({ key: "upload-avatar", limit: 5, window: 60 })])
  .inputValidator(instance(FormData))
  .handler(async ({ data }) => {
    const session = await auth.api.getSession({
      headers: getRequestHeaders(),
    });

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
    const detected = detectImageType(buffer);

    if (!detected) {
      throw new Error("Invalid file type. Only JPEG, PNG, and WebP are allowed");
    }

    // Delete old R2 object if exists
    const [currentUser] = await db
      .select({ image: user.image })
      .from(user)
      .where(eq(user.id, session.user.id));

    if (currentUser?.image?.includes(env.R2_PUBLIC_URL)) {
      const oldKey = currentUser.image.replace(`${env.R2_PUBLIC_URL}/`, "");
      await r2.fetch(`${R2_ENDPOINT}/${env.R2_BUCKET_NAME}/${oldKey}`, {
        method: "DELETE",
      });
    }

    const key = `avatars/${session.user.id}-${crypto.randomUUID()}.${detected.ext}`;

    await r2.fetch(`${R2_ENDPOINT}/${env.R2_BUCKET_NAME}/${key}`, {
      method: "PUT",
      headers: { "Content-Type": detected.mime },
      body: buffer,
    });

    const imageUrl = `${env.R2_PUBLIC_URL}/${key}`;

    await db
      .update(user)
      .set({ image: imageUrl, updatedAt: new Date().toISOString() })
      .where(eq(user.id, session.user.id));

    await auth.api.updateUser({
      headers: getRequestHeaders(),
      body: { image: imageUrl },
    });
  });
