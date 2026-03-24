import { passkeyClient } from "@better-auth/passkey/client";
import { multiSessionClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  plugins: [multiSessionClient(), passkeyClient()],
});

export const signIn = async (provider: "google" | "github") => {
  await authClient.signIn.social({
    provider,
    callbackURL: "/tasks",
  });
};

export const { signOut } = authClient;
