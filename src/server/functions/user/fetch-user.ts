import { createServerFn } from "@tanstack/react-start";

import { db } from "@/lib/db/db";
import { getSession } from "@/server/functions/session/get-session";

export const fetchUser = createServerFn({ method: "GET" }).handler(async () => {
  const session = await getSession();
  if (!session?.userId) throw new Error("Unauthorized");

  const user = await db.query.user.findFirst({
    where: (user, { eq }) => eq(user.id, session.userId),
  });

  return user;
});
