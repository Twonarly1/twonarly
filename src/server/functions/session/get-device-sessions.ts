import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

import { auth } from "@/lib/config/auth.config";

export const getDeviceSessions = createServerFn({ method: "POST" }).handler(async () => {
  const headers = getRequestHeaders();

  const [deviceSessions, currentSession] = await Promise.all([
    auth.api.listDeviceSessions({ headers }),
    auth.api.getSession({ headers }),
  ]);

  const currentUserId = currentSession?.user?.id;

  return deviceSessions.sort((a, b) => {
    if (a.user.id === currentUserId) return -1;
    if (b.user.id === currentUserId) return 1;
    return 0;
  });
});
