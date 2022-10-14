import { gql } from "@apollo/client";

export const GetAllPostsDocument = gql`
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
          categhories {
            name
            slug
          }
        }
      }
    }
  }
`;
