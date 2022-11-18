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
  mutation createUser(
    $phone: String!
    $name: String!
    $password: String!
    $address: String
    $companyName: String
  ) {
    createUser(
      phone: $phone
      name: $name
      password: $password
      address: $address
      companyName: $companyName
    ) {
      id
      phone
      name
      companyName
      address
    }
  }
`;

export const updateUser = gql`
  mutation editUser(
    $phone: String!
    $name: String!
    $address: String
    $companyName: String
    $id: ID!
  ) {
    editUser(
      id: $id
      phone: $phone
      name: $name
      address: $address
      companyName: $companyName
    )
  }
`;

export const getUsers = gql`
  query users {
    users {
      id
      phone
      name
      companyName
      address
      userRoles {
        userId
        roleIds
        roleDetails {
          permissions
          name
          permissionsDetails {
            name
          }
        }
      }
    }
  }
`;
export const getUserById = gql`
  query user($id: ID!) {
    user(id: $id) {
      id
      phone
      name
      companyName
      address
    }
  }
`;

export const deleteUser = gql`
  mutation deleteUser($id: ID!) {
    deleteUser(id: $id)
  }
`;
