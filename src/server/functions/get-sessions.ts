import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

import { auth } from "@/lib/config/auth.config";

export const getSessions = createServerFn({ method: "POST" }).handler(async () => {
  const headers = getRequestHeaders();
  return await auth.api.listSessions({ headers });
});
