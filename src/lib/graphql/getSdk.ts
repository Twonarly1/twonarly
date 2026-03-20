import { GraphQLClient } from "graphql-request";

import { getSdk as getGeneratedSdk } from "@/generated/graphql/graphql.sdk";

const getSdk = async () => {
  const graphqlClient = new GraphQLClient(process.env.API_BASE_URL as string);

  return getGeneratedSdk(graphqlClient);
};

export default getSdk;
