import { passkey } from "@better-auth/passkey";
import { stripe } from "@better-auth/stripe";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { generateRandomString } from "better-auth/crypto";
import { betterAuth } from "better-auth/minimal";
import { multiSession, siwe } from "better-auth/plugins";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { verifyMessage } from "viem";

import { linkWalletPlugin } from "@/lib/auth/link-wallet.plugin";
import { app } from "@/lib/config/app.config";
import { stripeClient } from "@/lib/config/stripe.config";
import { env } from "@/lib/config/t3.config";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";

import type { BetterAuthOptions } from "better-auth";

// SIWE domain
const SIWE_DOMAIN = new URL(env.BETTER_AUTH_URL ?? app.url).host;

// SIWE plugin
const siwePlugin = siwe({
  domain: SIWE_DOMAIN,
  anonymous: true,
  getNonce: async () => generateRandomString(32, "a-z", "A-Z", "0-9"),
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
});

// Stripe plugin
const stripePlugin = stripe({
  stripeClient,
  stripeWebhookSecret: env.STRIPE_WEBHOOK_SECRET,
  createCustomerOnSignUp: true,
  subscription: {
    enabled: true,
    plans: [{ name: "basic", priceId: "price_1TEuNq2LlOYTb68G8n9sH7m" }],
  },
});

// Rate limit
const rateLimit = {
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
};

// Session
const session = {
  cookieCache: {
    enabled: true,
    maxAge: 60 * 5,
  },
};

// Social providers
const socialProviders = {
  github: {
    clientId: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET,
  },

  google: {
    prompt: "select_account",
    clientId: env.GOOGLE_CLIENT_ID,
    clientSecret: env.GOOGLE_CLIENT_SECRET,
  },
} satisfies BetterAuthOptions["socialProviders"];

// Auth ⚡️
export const auth = betterAuth({
  appName: app.name,
  baseURL: env.BETTER_AUTH_URL,
  database: drizzleAdapter(db, { provider: "pg", schema }),
  emailAndPassword: { enabled: false },
  rateLimit,
  session,
  socialProviders,
  plugins: [
    multiSession({ maximumSessions: 3 }),
    passkey(),
    siwePlugin,
    linkWalletPlugin({ domain: SIWE_DOMAIN }),
    stripePlugin,
    tanstackStartCookies(),
  ],
});
