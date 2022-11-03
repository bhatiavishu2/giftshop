import { gql } from "@apollo/client";

export const createPermission = gql`
  mutation createPermission($name: String!) {
    createPermission(name: $name) {
      id
      name
    }
  }
`;

export const getPermissionById = gql`
  query permission($id: ID!) {
    permission(id: $id) {
      id
      name
    }
  }
`;

export const getPermissions = gql`
  query permissions {
    permissions {
      id
      name
    }
  }
`;

export const deletePermission = gql`
  mutation deletePermission($id: ID!) {
    deletePermission(id: $id)
  }
`;

export const updatePermission = gql`
  mutation editPermission($name: String!, $id: ID!) {
    editPermission(id: $id, name: $name)
  }
`;
