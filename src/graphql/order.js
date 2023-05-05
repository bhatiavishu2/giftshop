import { gql } from "@apollo/client";
export const createOrder = gql`
  mutation createOrder(
    $userId: String
    $productIds: String
    $orderStatus: String
    $orderRemarks: String
    $shippingDetails: String
    $initialPayment: String
    $uploadedPhotos: String
  ) {
    createOrder(
      userId: $userId
      productIds: $productIds
      orderStatus: $orderStatus
      orderRemarks: $orderRemarks
      shippingDetails: $shippingDetails
      initialPayment: $initialPayment
      uploadedPhotos: $uploadedPhotos
    ) {
      id
    }
  }
`;
