import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";

import { db } from "@/lib/db/db";
import { walletAddress } from "@/lib/db/schema";
import { ensureSession } from "../session/ensure-session";

export const fetchLinkedWallets = createServerFn({ method: "GET" }).handler(async () => {
  const session = await ensureSession();

  const wallets = await db
    .select()
    .from(walletAddress)
    .where(eq(walletAddress.userId, session.user.id));

  return wallets;
});
