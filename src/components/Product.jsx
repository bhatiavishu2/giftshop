import React, { useState, useContext } from "react";
import { CartDispatchContext, addToCart } from "contexts/cart";
import { AuthStateContext } from "contexts/auth";
import { imagesUrl} from "../constants";
import {Permissions} from '../constants/common'

const ProductCard = ({ data, onPreview , onClick, onDelete, onEdit}) => {
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useContext(CartDispatchContext);
  const authState = useContext(AuthStateContext);
  const { categoryImage,images, name, price, id, stock, productDescription } = data;

  const handleAddToCart = () => {
    const product = { ...data, quantity: 1 };
    addToCart(dispatch, product);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
    }, 3500);
  };

  return (
    <div className={`product ${onClick?'category':''}`} onClick={()=>onClick && onClick(data)}>
      
      <div className="product-image">
        <img src={`${imagesUrl}/${categoryImage || (images && images[0])}`} alt={name} onClick={()=>onPreview && onPreview(data)} />
      </div>
      {name && <h4 className="product-name">{name}</h4>}
     {price && <p className="product-price">{price}</p>}
     {authState.hasPermissions([Permissions.DELETE_CATEGORY, Permissions.DELETE_PRODUCT]) && <button className="outline delete-icon" onClick={(e) => {
      e.stopPropagation()
      onDelete(data)
     }}>
          <i className="rsc-icon-delete" />
        </button>}
        {authState.hasPermissions([Permissions.EDIT_CATEGORY, Permissions.EDIT_PRODUCT]) && <button className="outline edit-icon" onClick={(e) => {
      e.stopPropagation()
      onEdit(data)
     }}>
          <i className="rsc-icon-edit" />
        </button>}
     {false && <div className="product-action">
        <button
          className={!isAdded ? "" : "added"}
          type="button"
          onClick={handleAddToCart}
        >
          {!isAdded ? "ADD TO CART" : "✔ ADDED"}
        </button>
      </div>}
    </div>
  );
};

export default ProductCard;
