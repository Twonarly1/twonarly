import { passkeyClient } from "@better-auth/passkey/client";
import { stripeClient } from "@better-auth/stripe/client";
import { multiSessionClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

type Provider = "google" | "github";

export const authClient = createAuthClient({
  plugins: [
    multiSessionClient(),
    passkeyClient(),
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
