import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { multiSession } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";

import { app } from "@/lib/config/app.config";
import { db } from "@/lib/db/db";
import * as schema from "@/lib/db/schema";

export const auth = betterAuth({
  appName: app.name,
  baseURL: process.env.BETTER_AUTH_URL!,
  database: drizzleAdapter(db, { provider: "pg", schema }),
  emailAndPassword: { enabled: false },
  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  plugins: [
    multiSession({ maximumSessions: 3 }),
    // make sure this is the last plugin in the array
    tanstackStartCookies(),
  ],
});
