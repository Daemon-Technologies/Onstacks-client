import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const createMiningMonitorClient = () => {
  return new ApolloClient({
    link: new HttpLink({
      uri: process.env.REACT_APP_MINING_MONITOR_GRAPHQL,
    }),
    cache: new InMemoryCache(),
  });
};
