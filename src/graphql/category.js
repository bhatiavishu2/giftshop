import { gql } from "@apollo/client";

export const createCategory = gql`
  mutation createCategory($name: String!, $categoryImage: String!) {
    createCategory(name: $name, categoryImage: $categoryImage) {
      id
      name
      categoryImage
    }
  }
`;

export const getCategories = gql`
  query categories {
    categories {
      id
      name
      categoryImage
      subCategories {
        id
        name
        category
      }
    }
  }
`;
