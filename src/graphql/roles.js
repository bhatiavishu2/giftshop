import { gql } from "@apollo/client";

export const createRole = gql`
  mutation createRole($name: String!, $permissions: [String]) {
    createRole(name: $name, permissions: $permissions) {
      id
      name
    }
  }
`;

export const getRoles = gql`
  query roles {
    roles {
      id
      name
      permissionsDetails {
        name
      }
    }
  }
`;
