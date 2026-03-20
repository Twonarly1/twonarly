import type { KnipConfig } from "knip";

/**
 * Knip configuration.
 * @see https://knip.dev/overview/configuration
 */
const knipConfig: KnipConfig = {
  entry: ["src/routes/**/*.{ts,tsx}", "src/router.tsx"],
  project: ["src/**/*.{ts,tsx,css}"],
  ignore: [
    "src/generated/**",
    "src/lib/config/**",
    "src/components/ui/**",
    "src/server/server.ts",
    "src/lib/db/server.ts",
    "src/lib/graphql/getSdk.ts",
    "src/lib/graphql/graphqlFetch.ts",
  ],
  tags: ["-knipignore"],
};

export default knipConfig;
