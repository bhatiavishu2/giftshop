import { useLocation } from "react-router-dom";
const MyOrder = () => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const param = searchParams.get("id");

  return <div>Order Successfully placed Your Order Id Is {param}</div>;
};

export default MyOrder;
