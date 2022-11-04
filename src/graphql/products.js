import { gql } from "@apollo/client";

export const getProducts = gql`
  query products($categoryId: ID!) {
    products: productsByCategory(categoryId: $categoryId) {
      id
      name
      price
      wholeSalePrice
      images
      productDescription
      subCategory
      shippingCharges
      localShippingCharges
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
export const getProductById = gql`
  query product($id: ID!) {
    product(id: $id) {
      id
      name
      price
      wholeSalePrice
      images
      productDescription
      subCategory
      shippingCharges
      localShippingCharges
      subCategoryDetails {
        id
        name
        category
        categoryDetails {
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
    }
  }
`;

export const updateProduct = gql`
  mutation editProduct(
    $id: ID!
    $name: String!
    $price: String!
    $images: [String]!
    $subCategory: String!
    $wholeSalePrice: String!
    $productDescription: String!
    $shippingCharges: String!
    $localShippingCharges: String
  ) {
    editProduct(
      id: $id
      name: $name
      price: $price
      images: $images
      subCategory: $subCategory
      wholeSalePrice: $wholeSalePrice
      productDescription: $productDescription
      shippingCharges: $shippingCharges
      localShippingCharges: $localShippingCharges
    )
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
    $localShippingCharges: String
  ) {
    createProduct(
      name: $name
      price: $price
      images: $images
      subCategory: $subCategory
      wholeSalePrice: $wholeSalePrice
      productDescription: $productDescription
      shippingCharges: $shippingCharges
      localShippingCharges: $localShippingCharges
    ) {
      id
      name
      price
      wholeSalePrice
      images
      subCategory
      productDescription
      shippingCharges
      localShippingCharges
    }
  }
`;

export const deleteProduct = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;
