import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

import { auth } from "@/lib/auth/auth.config";

export const getSession = createServerFn({ method: "GET" }).handler(async () => {
  const sessionData = await auth.api.getSession({ headers: getRequestHeaders() });

  return sessionData;
});
