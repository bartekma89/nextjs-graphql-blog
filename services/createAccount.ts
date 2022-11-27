import { gql } from "graphql-request";

import {
  CreateAccountMutation,
  CreateAccountMutationVariables,
} from "../generated-graphql/graphql";
import {
  authorizedRequestClient,
  requestClient,
} from "../graphql/graphqlRequest";
import { RegistrationFormData } from "../types/form.types";

const CREATE_ACCOUNT = gql`
  mutation CreateAccount($email: String!, $password: String!) {
    createAccount(data: { email: $email, password: $password }) {
      id
      stage
    }
  }
`;

export const createAccount = async ({
  email,
  password,
}: RegistrationFormData) => {
  const data = await authorizedRequestClient.request<
    CreateAccountMutation,
    CreateAccountMutationVariables
  >(CREATE_ACCOUNT, { email, password });

  return data.createAccount;
};
