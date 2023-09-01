import { gql } from "@apollo/client";
export const createCustomOrder = gql`
  mutation createCustomOrder(
    $name: String
    $phone: String
    $address: String
    $city: String
    $state: String
    $pinCode: String
    $itemName: String
  ) {
    createCustomOrder(
      name: $name
      phone: $phone
      address: $address
      city: $city
      state: $state
      pinCode: $pinCode
      itemName: $itemName
    ) {
      id
    }
  }
`;

export const getOrders = gql`
  query customOrders {
    customOrders {
      id
      name
      phone
      address
      city
      state
      pinCode
      itemName
    }
  }
`;
