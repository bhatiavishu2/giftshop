import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import {
  CartStateContext,
  CartDispatchContext,
  removeFromCart,
  toggleCartPopup,
} from "contexts/cart";
import { AuthStateContext } from "contexts/auth";
import { imagesUrl } from "../constants";
import {Permissions} from '../constants/common'

const CartPreview = () => {
  const { items, isCartOpen } = useContext(CartStateContext);
  const dispatch = useContext(CartDispatchContext);
  const history = useHistory();
  const authState = useContext(AuthStateContext);

  const handleRemove = (productId) => {
    return removeFromCart(dispatch, productId);
  };

  const handleProceedCheckout = () => {
    toggleCartPopup(dispatch);
    history.push("/checkout");
  };
  
  return (
    <div className={classNames("cart-preview", { active: isCartOpen })}>
      <ul className="cart-items">
        {items.map((product) => {
          return (
            <li className="cart-item" key={product.name}>
              <img className="product-image" src={`${imagesUrl}/${product.images[0]}`} />
              <div className="product-info">
                <p className="product-name">{product.name}</p>
                <div> {product.price && <p className="product-price">{authState.hasPermissions([Permissions.RESELLER,Permissions.SHOPKEEPER])?  product.wholeSalePrice:product.price}</p>}</div>
              </div>
              <div className="product-total">
                <p className="quantity">
                  {`${product.quantity} ${
                    product.quantity > 1 ? "Nos." : "No."
                  }`}
                </p>
                <p className="amount">{product.quantity * (authState.hasPermissions([Permissions.RESELLER,Permissions.SHOPKEEPER])?  product.wholeSalePrice:product.price)}</p>
              </div>
              <button
                className="product-remove"
                onClick={() => handleRemove(product.id)}
              >
                ×
              </button>
            </li>
          );
        })}
      </ul>
      <div className="action-block">
        <button
          type="button"
          className={classNames({ disabled: items && items.length === 0 })}
          onClick={handleProceedCheckout}
        >
          PROCEED TO CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default CartPreview;
