import { gql } from "@apollo/client";

export const login = gql`
  mutation login($phone: String!, $password: String!) {
    login(phone: $phone, password: $password) {
      token
      userId
    }
  }
`;

export const context = gql`
  query context($token: String!) {
    context(token: $token) {
      userId
      userDetails {
        name
      }
      roleDetails {
        permissionsDetails {
          name
        }
      }
    }
  }
`;

export const createUser = gql`
  mutation createUser($phone: String!, $name: String!, $password: String!) {
    createUser(phone: $phone, name: $name, password: $password) {
      id
      phone
      name
    }
  }
`;

export const getUsers = gql`
  query users {
    users {
      id
      phone
      name
    }
  }
`;
