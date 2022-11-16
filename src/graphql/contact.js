import { gql } from "@apollo/client";

export const createContactUs = gql`
  mutation createContact($html: String!) {
    createContact(html: $html) {
      id
      html
    }
  }
`;

export const getContactUs = gql`
  query contact {
    contact {
      id
      html
    }
  }
`;
