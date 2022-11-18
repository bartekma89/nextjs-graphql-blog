import { gql } from "graphql-request";
import {
  GetCategoryPostQuery,
  GetCategoryPostQueryVariables,
} from "../generated-graphql/graphql";
import { requestClient } from "../graphql/graphqlRequest";

const GET_CATEGORY_POST = gql`
  query GetCategoryPost($slug: String!) {
    postsConnection(where: { categories_some: { slug: $slug } }) {
      edges {
        cursor
        node {
          author {
            bio
            name
            id
            photo {
              url
            }
          }
          createdAt
          slug
          title
          excerpt
          featuredImage {
            url
          }
          categories {
            name
            slug
          }
        }
      }
    }
  }
`;

export const getCategoryPost = async (slug: string) => {
  const data = await requestClient.request<
    GetCategoryPostQuery,
    GetCategoryPostQueryVariables
  >(GET_CATEGORY_POST, { slug });

  return data.postsConnection;
};
