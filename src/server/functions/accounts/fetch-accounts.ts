import { createServerFn } from "@tanstack/react-start";
import { inArray } from "drizzle-orm";

import { db } from "@/lib/db/db";
import { account } from "@/lib/db/schema";
import { getDeviceSessions } from "../session/get-device-sessions";

export const fetchAccounts = createServerFn({ method: "GET" }).handler(async () => {
  const deviceSessions = await getDeviceSessions();
  const userIds = deviceSessions.map((session) => session.user.id);
  return db
    .select({ userId: account.userId, providerId: account.providerId, scope: account.scope })
    .from(account)
    .where(inArray(account.userId, userIds));
});
