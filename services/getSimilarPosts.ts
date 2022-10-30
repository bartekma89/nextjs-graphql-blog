import { gql } from "graphql-request";
import {
  GetSimilarPostsQuery,
  GetSimilarPostsQueryVariables,
} from "../generated-graphql/graphql";
import { requestClient } from "../graphql/graphqlRequest";

export const GET_SIMILAR_POSTS = gql`
  query GetSimilarPosts($slug: String!, $categories: [String!]) {
    posts(
      where: {
        slug_not: $slug
        AND: { categhories_some: { slug_in: $categories } }
      }
    ) {
      title
      featuredImage {
        url
      }
      createdAt
      slug
    }
  }
`;

export const getSimilarPosts = async (slug: string, categories: string[]) => {
  const data = await requestClient.request<
    GetSimilarPostsQuery,
    GetSimilarPostsQueryVariables
  >(GET_SIMILAR_POSTS, { slug, categories });

  return data.posts;
};
