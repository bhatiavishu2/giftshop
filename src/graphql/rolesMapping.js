import { gql } from "@apollo/client";

export const createUserRole = gql`
  mutation createRoleMapping($userId: ID!, $roleIds: [String]) {
    createRoleMapping(roleIds: $roleIds, userId: $userId) {
      id
    }
  }
`;

export const getRolesMapping = gql`
  query rolesMapping {
    rolesMapping {
      id
      userId
      roleIds
      userDetails {
        id
        phone
        name
      }
      roleDetails {
        id
        permissions
        name
        permissionsDetails {
          id
          name
        }
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
