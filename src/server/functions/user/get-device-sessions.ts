import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

import { auth } from "@/lib/auth/auth.config";

export const getDeviceSessions = createServerFn({ method: "POST" }).handler(async () => {
  const headers = getRequestHeaders();

  const [deviceSessions, currentSession] = await Promise.all([
    auth.api.listDeviceSessions({ headers }),
    auth.api.getSession({ headers }),
  ]);

  const currentUserId = currentSession?.user?.id;

  return deviceSessions
    .map((ds) => ({
      ...ds,
      isCurrent: ds.user.id === currentUserId,
    }))
    .sort((a, b) => {
      if (a.isCurrent) return -1;
      if (b.isCurrent) return 1;
      return 0;
    });
});
