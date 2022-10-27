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

export const updateCategory = gql`
  mutation editCategory(
    $name: String!
    $categoryImage: String
    $categoryId: ID!
  ) {
    editCategory(
      categoryId: $categoryId
      name: $name
      categoryImage: $categoryImage
    )
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

export const getCategoryById = gql`
  query category($id: ID!) {
    category(id: $id) {
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

export const deleteCategory = gql`
  mutation deleteCategory($id: ID!) {
    deleteCategory(id: $id)
  }
`;
