import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

import { auth } from "@/lib/config/auth.config";

export const getAccounts = createServerFn({ method: "GET" }).handler(async () => {
  const headers = getRequestHeaders();

  const accounts = await auth.api.listUserAccounts({ headers });

  return accounts;
});
