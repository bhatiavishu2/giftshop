import { gql } from "@apollo/client";

export const getProducts = gql`
  query products {
    products {
      id
      name
      price
      images
      category
    }
  }
`;
