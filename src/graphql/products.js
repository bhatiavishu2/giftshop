import { gql } from "@apollo/client";

export const getProducts = gql`
  query products {
    products {
      id
      name
      price
      wholeSalePrice
      images
      productDescription
      subCategory
      subCategoryDetails {
        id
        name
        category
        categoryDetails {
          id
          name
          categoryImage
        }
      }
    }
  }
`;

export const createProduct = gql`
  mutation createProduct(
    $name: String!
    $price: String!
    $images: [String]!
    $subCategory: String!
    $wholeSalePrice: String!
    $productDescription: String!
    $shippingCharges: String!
  ) {
    createProduct(
      name: $name
      price: $price
      images: $images
      subCategory: $subCategory
      wholeSalePrice: $wholeSalePrice
      productDescription: $productDescription
      shippingCharges: $shippingCharges
    ) {
      id
      name
      price
      wholeSalePrice
      images
      subCategory
      productDescription
    }
  }
`;
