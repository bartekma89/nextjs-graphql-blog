import { gql } from "graphql-request";

import {
  CreatePostCommentMutation,
  CreatePostCommentMutationVariables,
} from "../generated-graphql/graphql";
import { requestClient } from "../graphql/graphqlRequest";

const CREATE_POST_COMMENT = gql`
  mutation CreatePostComment(
    $name: String!
    $email: String!
    $comment: String!
    $slug: String!
  ) {
    createComment(
      data: {
        name: $name
        email: $email
        comment: $comment
        post: { connect: { slug: $slug } }
      }
    ) {
      comment
      id
      createdAt
    }
  }
`;

export const createPostComment = async (postData: {
  data: CreatePostCommentMutationVariables;
}) => {
  const result = await requestClient.request<
    CreatePostCommentMutation,
    CreatePostCommentMutationVariables
  >(CREATE_POST_COMMENT, postData.data);

  return result.createComment;
};
