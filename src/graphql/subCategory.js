import { gql } from "@apollo/client";

export const createSubCategory = gql`
  mutation createSubCategory($name: String!, $category: String!) {
    createSubCategory(name: $name, category: $category) {
      id
      name
      category
      categoryDetails {
        name
        id
        categoryImage
      }
    }
  }
`;
