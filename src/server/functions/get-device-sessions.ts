import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

import { auth } from "@/lib/config/auth.config";

const getDeviceSessions = createServerFn({ method: "POST" }).handler(async () => {
  const headers = getRequestHeaders();

  const deviceSessions = await auth.api.listDeviceSessions({ headers });

  return deviceSessions;
});

export { getDeviceSessions };
