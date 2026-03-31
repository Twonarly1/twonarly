import { createServerFn } from "@tanstack/react-start";

import { db } from "@/lib/db/db";
import { ensureSession } from "@/server/functions/session/ensure-session";

export const fetchUser = createServerFn({ method: "GET" }).handler(async () => {
  const session = await ensureSession();

  const user = await db.query.user.findFirst({
    where: (user, { eq }) => eq(user.id, session.user.id),
  });

  return user;
});
