import { multiSessionClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  plugins: [multiSessionClient()],
});

export const signIn = async () => {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: "/tasks",
  });
};

export const { signOut } = authClient;
