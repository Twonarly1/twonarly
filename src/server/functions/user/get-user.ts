import { createServerFn } from "@tanstack/react-start";

import { db } from "@/lib/db/db";

export const getUser = createServerFn({ method: "GET" })
  .inputValidator((data: { userId: string }) => data)
  .handler(async ({ data }) => {
    const user = await db.query.user.findFirst({
      where: (user, { eq }) => eq(user.id, data.userId),
    });

    return user;
  });
