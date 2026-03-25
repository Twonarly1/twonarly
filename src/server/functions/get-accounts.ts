import { createServerFn } from "@tanstack/react-start";
import { inArray } from "drizzle-orm";

import { db } from "@/lib/db/db";
import { account } from "@/lib/db/schema";

export const getAccountsByUserIds = createServerFn({ method: "GET" })
  .inputValidator((data: { userIds: string[] }) => data)
  .handler(async ({ data }) => {
    return db
      .select({ userId: account.userId, providerId: account.providerId, scope: account.scope })
      .from(account)
      .where(inArray(account.userId, data.userIds));
  });
