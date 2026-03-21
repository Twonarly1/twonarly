/** biome-ignore-all lint/correctness/useHookAtTopLevel: Allow yoga plugins */
/** biome-ignore-all lint/suspicious/noConsole: Allow logging to the console */

import { cors } from "@elysiajs/cors";
import { yoga } from "@elysiajs/graphql-yoga";
import { useParserCache } from "@envelop/parser-cache";
import { useValidationCache } from "@envelop/validation-cache";
import { Elysia } from "elysia";
import { useGrafast } from "grafast/envelop";

import { schema } from "@/generated/graphql/schema.executable";
import { auth } from "@/lib/config/auth.config";
import { env } from "@/lib/config/t3.config";
import createGraphqlContext from "@/lib/db/utils/create-graphql-context";

const app = new Elysia()
  .use(
    cors({
      origin: env.CORS_ALLOWED_ORIGINS.split(","),
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  )
  .use(
    yoga({
      schema,
      context: createGraphqlContext,
      plugins: [
        // parser and validation caches recommended for Grafast (https://grafast.org/grafast/servers#envelop)
        useParserCache(),
        useValidationCache(),
        useGrafast(),
      ],
    }),
  )
  .mount(auth.handler)
  .listen(4001);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
