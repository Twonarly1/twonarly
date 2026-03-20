import { createWithPgClient } from "postgraphile/adaptors/pg";

import { pool as db } from "@/lib/db/db";

import type { YogaInitialContext } from "graphql-yoga";
import type { WithPgClient } from "postgraphile/@dataplan/pg";
import type { NodePostgresPgClient, PgSubscriber } from "postgraphile/adaptors/pg";

const withPgClient = createWithPgClient({ pool: db });

// Merge declarations for `observer` and `db` which are used within plan resolvers. See: https://grafast.org/grafast/step-library/standard-steps/context#typescript
declare global {
  namespace Grafast {
    interface Context {
      db: typeof db;
    }
  }
}

interface GraphQLContext {
  /** Network request. */
  request: Request;
  /** Database. */
  db: typeof db;
  /** Postgres client, injected by Postgraphile. */
  withPgClient: WithPgClient<NodePostgresPgClient>;
  /** Postgres settings for the current request, injected by Postgraphile. */
  pgSettings: Record<string, string | undefined> | null;
  /** Postgres subscription client for the current request, injected by Postgraphile. */
  pgSubscriber: PgSubscriber | null;
}

/**
 * Create a GraphQL context.
 * @see https://graphql.org/learn/execution/#root-fields-and-resolvers
 */
const createGraphqlContext = async ({
  request,
}: Omit<YogaInitialContext, "waitUntil">): Promise<
  Omit<GraphQLContext, "pgSettings" | "pgSubscriber">
> => ({
  request,
  db,
  withPgClient,
});

export default createGraphqlContext;
