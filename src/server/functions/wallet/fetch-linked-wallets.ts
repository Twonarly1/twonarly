import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { eq } from "drizzle-orm";

import { auth } from "@/lib/config/auth.config";
import { db } from "@/lib/db/db";
import { walletAddress } from "@/lib/db/schema";

export const fetchLinkedWallets = createServerFn({ method: "GET" }).handler(async () => {
  const session = await auth.api.getSession({ headers: getRequestHeaders() });

  if (!session) {
    throw new Error("Unauthorized");
  }

  const wallets = await db
    .select()
    .from(walletAddress)
    .where(eq(walletAddress.userId, session.user.id));

  return wallets;
});
