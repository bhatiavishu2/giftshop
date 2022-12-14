import { gql } from "@apollo/client";
export const getHomePageData = gql`
  query homePageData($latestProductLimit: Int, $bannerLimit: Int) {
    contact {
      id
      html
    }

    about {
      id
      html
    }

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
    latestProducts(limit: $latestProductLimit) {
      id
      name
      price
      wholeSalePrice
      images
      productDescription
      subCategory
      previewFile
      shippingCharges
      localShippingCharges
      videoUrl
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
    banners(limit: $bannerLimit) {
      id
      bannerUrls
      merchantBannerUrls
      merchantMobileBannerUrls
      mobileBannerUrls
    }
  }
`;
