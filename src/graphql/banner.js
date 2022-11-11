import { gql } from "@apollo/client";
export const createBanner = gql`
  mutation createBanner($bannerUrl: String) {
    createBanner(bannerUrl:$bannerUrl){
        id
        bannerUrl
    }
  }
`;


export const getBanner = gql`
  query banners($limit: Int) {
    banners(limit:$limit){
      id
      bannerUrl
    }
  }
`;