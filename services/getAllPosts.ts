import { gql } from "@apollo/client";
import { GetAllPostsQuery } from "../generated-graphql/graphql";
import { requestClient } from "../graphql/graphqlRequest";

export const GET_ALL_POSTS = gql`
  query GetAllPosts {
    postsConnection {
      edges {
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

export const getAllPost = async () => {
  const data = await requestClient.request<GetAllPostsQuery>(GET_ALL_POSTS);

  return data.postsConnection.edges;
};
