import { GraphQLClient } from "graphql-request";

export const requestClient = new GraphQLClient(process.env.graphcmsURI ?? "");