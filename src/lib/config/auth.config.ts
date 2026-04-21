import { passkey } from "@better-auth/passkey";
import { stripe } from "@better-auth/stripe";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { generateRandomString } from "better-auth/crypto";
import { betterAuth } from "better-auth/minimal";
import { multiSession, siwe } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { verifyMessage } from "viem";

import { app } from "@/lib/config/app.config";
import { env } from "@/lib/config/t3.config";
import { db } from "@/lib/db/db";
import * as schema from "@/lib/db/schema";
import { linkWalletPlugin } from "../auth/link-wallet-plugin";
import { stripeClient } from "./stripe.config";

const SIWE_DOMAIN = new URL(env.BETTER_AUTH_URL ?? app.url).host;

export const auth = betterAuth({
  appName: app.name,
  baseURL: env.BETTER_AUTH_URL,
  database: drizzleAdapter(db, { provider: "pg", schema }),
  emailAndPassword: { enabled: false },
  rateLimit: {
    enabled: true,
    window: 10,
    max: 100,
    customRules: {
      "/siwe/nonce": { window: 60, max: 5 },
      "/siwe/link-wallet": { window: 60, max: 5 },
      "/siwe/verify": { window: 60, max: 5 },
      "/siwe/unlink-wallet": { window: 60, max: 5 },
      "/sign-in/*": { window: 60, max: 10 },
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },
  socialProviders: {
    github: {
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    },
    google: {
      prompt: "select_account",
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [
    multiSession({ maximumSessions: 3 }),
    passkey(),
    siwe({
      domain: SIWE_DOMAIN,
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
    linkWalletPlugin({ domain: SIWE_DOMAIN }),
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
