import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

import { auth } from "@/lib/config/auth.config";

export const fetchUserPasskeys = createServerFn({ method: "POST" }).handler(async () => {
  return await auth.api.listPasskeys({ headers: getRequestHeaders() });
});
