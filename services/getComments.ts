import { gql } from "graphql-request";
import {
  GetCommentsQuery,
  GetCommentsQueryVariables,
} from "../generated-graphql/graphql";
import { requestClient } from "../graphql/graphqlRequest";

const GET_COMMENTS = gql`
  query GetComments($slug: String!) {
    comments(where: { post: { slug: $slug } }) {
      createdAt
      id
      comment
      name
    }
  }
`;

export const getComments = async (slug: GetCommentsQueryVariables["slug"]) => {
  const data = await requestClient.request<
    GetCommentsQuery,
    GetCommentsQueryVariables
  >(GET_COMMENTS, { slug });

  return data.comments;
};
