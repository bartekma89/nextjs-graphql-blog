import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: process.env.graphcmsURI,
  cache: new InMemoryCache(),
});
