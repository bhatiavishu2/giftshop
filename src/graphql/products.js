import { gql } from "@apollo/client";

export const getProducts = gql`
  query productsAndSubCategories($categoryId: ID!) {
    products: productsByCategory(categoryId: $categoryId) {
      id
      name
      price
      wholeSalePrice
      images
      productDescription
      subCategory
      previewFile
      shippingCharges
      videoUrl
      localShippingCharges
      isOutOfStock
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
    category(id: $categoryId) {
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
      isOutOfStock
      localShippingCharges
      videoUrl
      previewFile
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
    $previewFile: String
    $videoUrl: String
    $isOutOfStock: Boolean
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
      previewFile: $previewFile
      videoUrl: $videoUrl
      isOutOfStock: $isOutOfStock
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
    $previewFile: String
    $videoUrl: String
    $isOutOfStock: Boolean
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
      previewFile: $previewFile
      videoUrl: $videoUrl
      isOutOfStock: $isOutOfStock
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
      previewFile
      videoUrl
      isOutOfStock
    }
  }
`;

export const deleteProduct = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;

export const getLatestProducts = gql`
  query latestProducts($limit: Int!) {
    latestProducts(limit: $limit) {
      id
      name
      price
      wholeSalePrice
      images
      productDescription
      isOutOfStock
      subCategory
      previewFile
      shippingCharges
      localShippingCharges
      videoUrl
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
