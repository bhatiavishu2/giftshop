import { gql } from "@apollo/client";

export const createAboutUs = gql`
  mutation createAbout($html: String!) {
    createAbout(html: $html) {
      id
      html
    }
  }
`;

export const getAboutUs = gql`
  query about {
    about {
      id
      html
    }
  }
`;
