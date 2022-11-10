import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import { AuthStateContext } from "contexts/auth";
import { useQuery } from "@apollo/client";
import { getLatestProducts } from "graphql/products";
import { imagesUrl } from "../constants";
import { Link } from "react-router-dom";
import { Permissions } from "../constants/common";

const CartPreview = ({handleClose}) => {
  const { loading, data: { latestProducts } = {}, refetch } = useQuery(
    getLatestProducts,
    { variables: { limit: 8 } }
  );
  const authState = useContext(AuthStateContext);
  const history = useHistory();
  useEffect(()=>{
    refetch()
  },[])

  if (loading) {
    return null;
  }

  const handleProceedCheckout = () => {
    history.push("/checkout");
  };


  return (
    <div className={classNames("cart-preview", { active: true })}>
      <h5 style={{ textAlign: "center", paddingTop: "15px" }}>
        Recent Products
      </h5>
      <button
            type="button"
            className="close"
            onClick={handleClose.bind(this)}
          >
            &times;
          </button>
      <ul className="cart-items">
        {latestProducts.map((product) => {
          return (
            <li key={product.id}>
              <Link
                className="cart-item"
                to={`/products/${product.subCategoryDetails.category}?productId=${product.id}`}
              >
                <img
                  className="product-image"
                  src={`${imagesUrl}/${product.images[0]}`}
                />
                <div className="product-info">
                  <label className="product-name">{product.name}</label>
                </div>
                <div className="product-total">
                  <label className="amount">
                    {authState.hasPermissions([
                      Permissions.RESELLER,
                      Permissions.SHOPKEEPER
                    ])
                      ? product.wholeSalePrice
                      : product.price}
                  </label>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CartPreview;
