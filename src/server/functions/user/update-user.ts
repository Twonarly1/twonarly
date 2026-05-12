import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { minLength, object, pipe, string } from "valibot";

import { auth } from "@/lib/auth/auth.config";

export const updateUser = createServerFn({ method: "POST" })
  .inputValidator(
    object({
      name: pipe(string(), minLength(1, "Name is required")),
    }),
  )
  .handler(async ({ data }) => {
    const session = await auth.api.getSession({ headers: getRequestHeaders() });

    if (!session) throw new Error("Unauthorized");

    await auth.api.updateUser({
      headers: getRequestHeaders(),
      body: { name: data.name },
    });
  });
