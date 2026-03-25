import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { multiSession } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";

import { app } from "@/lib/config/app.config";
import { env } from "@/lib/config/t3.config";
import { db } from "@/lib/db/db";
import * as schema from "@/lib/db/schema";

export const auth = betterAuth({
  appName: app.name,
  baseURL: env.BETTER_AUTH_URL,
  database: drizzleAdapter(db, { provider: "pg", schema }),
  emailAndPassword: { enabled: false },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      // scopes: ["repo"],
      scope: ["repo"],
    },
    google: {
      prompt: "select_account",
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [
    // TODO: show a warning when the maximum number of sessions is reached and prevent new sign-ins until an existing session is signed out
    multiSession({ maximumSessions: 3 }),
    // passkey(),
    // make sure this is the last plugin in the array
    tanstackStartCookies(),
  ],
});
