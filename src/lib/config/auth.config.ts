// import { passkey } from "@better-auth/passkey";
import { stripe } from "@better-auth/stripe";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { generateRandomString } from "better-auth/crypto";
import { multiSession, siwe } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { verifyMessage } from "viem";

import { app } from "@/lib/config/app.config";
import { env } from "@/lib/config/t3.config";
import { db } from "@/lib/db/db";
import * as schema from "@/lib/db/schema";
import { linkWalletPlugin } from "../auth/link-wallet-plugin";
import { stripeClient } from "./stripe.config";

export const auth = betterAuth({
  appName: app.name,
  baseURL: env.BETTER_AUTH_URL,
  database: drizzleAdapter(db, { provider: "pg", schema }),
  emailAndPassword: { enabled: false },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
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
    siwe({
      domain: "twonarly.vercel.app",
      anonymous: true,
      getNonce: async () => {
        return generateRandomString(32, "a-z", "A-Z", "0-9");
      },
      verifyMessage: async ({ message, signature, address }) => {
        try {
          return await verifyMessage({
            address: address as `0x${string}`,
            message,
            signature: signature as `0x${string}`,
          });
        } catch {
          return false;
        }
      },
    }),
    linkWalletPlugin(),
    stripe({
      stripeClient,
      stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET,
      createCustomerOnSignUp: true,
      subscription: {
        enabled: true,
        plans: [
          {
            name: "basic",
            priceId: "price_1TEvh82LlOYTb68GIvAivwDo",
          },
        ],
      },
    }),
    // make sure this is the last plugin in the array
    tanstackStartCookies(),
  ],
});
