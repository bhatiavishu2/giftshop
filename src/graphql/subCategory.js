import { gql } from "@apollo/client";

export const editSubCategory = gql`
  mutation editSubCategory($name: String!, $category: String!, $id: ID!) {
    editSubCategory(id: $id, name: $name, category: $category)
  }
`;
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

export const getSubCategories = gql`
  query subCategories {
    subCategories {
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

export const getSubCategoryById = gql`
  query subCategory($id: ID!) {
    subCategory(id: $id) {
      id
      name
      category
    }
  }
`;
export const deleteSubCategory = gql`
  mutation deleteSubCategory($id: ID!) {
    deleteSubCategory(id: $id)
  }
`;
