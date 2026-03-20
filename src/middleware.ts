import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

import { auth } from "@/lib/config/auth.config";

export const authMiddleware = createMiddleware().server(async ({ next }) => {
  const headers = getRequestHeaders();
  const sessionData = await auth.api.getSession({ headers });

  if (!sessionData) throw redirect({ to: "/" });

  return next({
    context: {
      session: sessionData.session,
      user: sessionData.user,
    },
  });
});
