import { createEnv } from "@t3-oss/env-core";
import { minLength, pipe, string, url } from "valibot";

const requiredString = () => pipe(string(), minLength(1));
const requiredUrl = () => pipe(string(), url());

export const env = createEnv({
  server: {
    DATABASE_URL: requiredUrl(),
    BETTER_AUTH_SECRET: requiredString(),
    BETTER_AUTH_URL: requiredUrl(),
    GOOGLE_CLIENT_ID: requiredString(),
    GOOGLE_CLIENT_SECRET: requiredString(),
    GITHUB_CLIENT_ID: requiredString(),
    GITHUB_CLIENT_SECRET: requiredString(),
    R2_ACCOUNT_ID: requiredString(),
    R2_ACCESS_KEY_ID: requiredString(),
    R2_SECRET_ACCESS_KEY: requiredString(),
    R2_BUCKET_NAME: requiredString(),
    R2_PUBLIC_URL: requiredUrl(),
    STRIPE_SECRET_KEY: requiredString(),
    STRIPE_WEBHOOK_SECRET: requiredString(),
    STRIPE_BASIC_PRICE_ID: requiredString(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
