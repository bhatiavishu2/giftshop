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

export const getRoleById = gql`
  query role($id: ID!) {
    role(id: $id) {
      id
      name
      permissionsDetails {
        name
        id
      }
    }
  }
`;

export const deleteRole = gql`
  mutation deleteRole($id: ID!) {
    deleteRole(id: $id)
  }
`;

export const updateRole = gql`
  mutation editRole($name: String!, $permissions: [String], $id: ID!) {
    editRole(id: $id, name: $name, permissions: $permissions)
  }
`;
