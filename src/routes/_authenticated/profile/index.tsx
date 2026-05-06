import { createFileRoute } from "@tanstack/react-router";

import { getSession } from "@/server/functions/user/get-session";

export const Route = createFileRoute("/_authenticated/profile/")({
  loader: async () => {
    const session = await getSession();

    if (!session) throw new Error("Unauthorized");

    return { user: session.user };
  },
});
