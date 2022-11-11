import { gql } from "@apollo/client";
export const createBanner = gql`
  mutation createBanner($bannerUrls: String!, $merchantBannerUrls: String!, $mobileBannerUrls: String!, $merchantMobileBannerUrls: String!) {
    createBanner(bannerUrls:$bannerUrls, merchantBannerUrls: $merchantBannerUrls, mobileBannerUrls:$mobileBannerUrls,merchantMobileBannerUrls: $merchantMobileBannerUrls){
        id
        bannerUrls
        merchantBannerUrls
        merchantMobileBannerUrls
        mobileBannerUrls
    }
  }
`;


export const getBanner = gql`
  query banners($limit: Int) {
    banners(limit:$limit){
      id
      bannerUrls
      merchantBannerUrls
      merchantMobileBannerUrls
      mobileBannerUrls
    }
  }
`;