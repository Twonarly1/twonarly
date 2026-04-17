import { passkeyClient } from "@better-auth/passkey/client";
import { stripeClient } from "@better-auth/stripe/client";
import { multiSessionClient, siweClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const AUTH_BASE = "/api/auth";

type Provider = "google" | "github";

export const authClient = createAuthClient({
  plugins: [
    multiSessionClient(),
    passkeyClient(),
    siweClient(),
    stripeClient({
      //if you want to enable subscription management
      subscription: true,
    }),
  ],
});

export const signIn = async (provider: Provider) => {
  await authClient.signIn.social({
    provider,
    callbackURL: "/tasks",
  });
};

export const { signOut } = authClient;
