import { gql } from "graphql-request";
import { GetCategoriesQuery } from "../generated-graphql/graphql";
import { requestClient } from "../graphql/graphqlRequest";

const GET_CATEGORIES = gql`
  query GetCategories {
    categories {
      name
      slug
    }
  }
`;

export const getCategories = async () => {
  const data = await requestClient.request<GetCategoriesQuery>(GET_CATEGORIES);

  return data.categories;
};
