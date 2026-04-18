import { defineConfig } from "drizzle-kit";

import { env } from "@/lib/config/t3.config";

const drizzleConfig = defineConfig({
  out: "src/generated/drizzle",
  schema: "src/lib/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: { url: env.DATABASE_URL },
});

export default drizzleConfig;
