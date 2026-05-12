import { createServerFn } from "@tanstack/react-start";
import { inArray } from "drizzle-orm";

import { db } from "@/lib/db";
import { account } from "@/lib/db/schema";
import { getDeviceSessions } from "./get-device-sessions";

export const getAccounts = createServerFn({ method: "GET" }).handler(async () => {
  const deviceSessions = await getDeviceSessions();
  const userIds = deviceSessions.map((session) => session.user.id);

  if (userIds.length === 0) return [];

  return db
    .select({ userId: account.userId, providerId: account.providerId })
    .from(account)
    .where(inArray(account.userId, userIds));
});
