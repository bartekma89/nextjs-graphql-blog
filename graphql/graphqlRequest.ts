import { GraphQLClient } from "graphql-request";

export const requestClient = new GraphQLClient(process.env.graphcmsURI ?? "");

export const authorizedRequestClient = new GraphQLClient(
  process.env.graphcmsURI ?? "",
  {
    headers: {
      Authorization: `Bearer ${process.env.graphcmsToken}`,
    },
  }
);
