import { gql } from "@apollo/client";
export const createBanner = gql`
  mutation createBanner($bannerUrls: String!, $merchantBannerUrls: String!, $mobileBannerUrls: String!) {
    createBanner(bannerUrls:$bannerUrls, merchantBannerUrls: $merchantBannerUrls, mobileBannerUrls:$mobileBannerUrls){
        id
        bannerUrls
        merchantBannerUrls
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
      mobileBannerUrls
    }
  }
`;