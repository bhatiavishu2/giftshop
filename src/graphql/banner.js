import { gql } from "@apollo/client";
export const createBanner = gql`
  mutation createBanner($bannerUrls: String) {
    createBanner(bannerUrls:$bannerUrls){
        id
        bannerUrls
    }
  }
`;


export const getBanner = gql`
  query banners($limit: Int) {
    banners(limit:$limit){
      id
      bannerUrls
    }
  }
`;