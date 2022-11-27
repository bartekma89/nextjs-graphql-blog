import { gql } from "graphql-request";
import {
  GetAccounyByEmailQuery,
  GetAccounyByEmailQueryVariables,
} from "../generated-graphql/graphql";
import { authorizedRequestClient } from "../graphql/graphqlRequest";

const GET_USER_BY_EMAIL = gql`
  query GetAccounyByEmail($email: String!) {
    user: account(where: { email: $email }, stage: DRAFT) {
      id
      password
      email
    }
  }
`;

export const getUserByEmail = async (email: string) => {
  const data = await authorizedRequestClient.request<
    GetAccounyByEmailQuery,
    GetAccounyByEmailQueryVariables
  >(GET_USER_BY_EMAIL, { email });

  return data.user;
};
