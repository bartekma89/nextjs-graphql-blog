import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: process.env.GRAPHCMS_URI,
  cache: new InMemoryCache(),
});
