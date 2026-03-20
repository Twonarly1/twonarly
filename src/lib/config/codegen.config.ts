import type { CodegenConfig } from "@graphql-codegen/cli";
import type { Types } from "@graphql-codegen/plugin-helpers";

type GraphQLCodegenConfig = Types.ConfiguredOutput;

/**
 * Shared plugins across the generated GraphQL Codegen artifacts.
 */
const sharedPlugins: GraphQLCodegenConfig["plugins"] = [
  "typescript",
  "typescript-operations",
  {
    add: {
      // prepend artifact with TS no-check directive
      content: "// @ts-nocheck",
    },
  },
];

/**
 * Shared configuration across each of the generated GraphQL Codegen artifacts.
 */
const sharedConfig: GraphQLCodegenConfig["config"] = {
  scalars: {
    Date: "Date",
    Datetime: "Date",
    UUID: "string",
    Cursor: "string",
    BigInt: "string",
  },
};

/**
 * GraphQL Code Generator configuration. This generates various artifacts based on the GraphQL schema.
 */
const codegen: CodegenConfig = {
  schema: process.env.API_BASE_URL!,
  documents: "src/lib/graphql/**/*.graphql",
  ignoreNoDocuments: true,
  generates: {
    // TypeScript SDK
    "src/generated/graphql/graphql.sdk.ts": {
      plugins: [...sharedPlugins, "typescript-graphql-request"],
      config: sharedConfig,
    },
    // React Query hooks, types, and utilities
    "src/generated/graphql/graphql.ts": {
      plugins: [...sharedPlugins, "typescript-react-query"],
      config: {
        ...sharedConfig,
        reactQueryVersion: 5,
        addInfiniteQuery: true,
        addSuspenseQuery: true,
        exposeQueryKeys: true,
        exposeMutationKeys: true,
        exposeFetcher: true,
        fetcher: {
          func: "@/lib/graphql/graphqlFetch#graphqlFetch",
        },
      },
    },
  },
};

export default codegen;
