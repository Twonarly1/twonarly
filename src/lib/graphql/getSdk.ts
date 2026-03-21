import { GraphQLClient } from "graphql-request";

import { getSdk as getGeneratedSdk } from "@/generated/graphql/graphql.sdk";
import { env } from "@/lib/config/t3.config";

const getSdk = async () => {
  const graphqlClient = new GraphQLClient(env.API_BASE_URL);

  return getGeneratedSdk(graphqlClient);
};

export default getSdk;
