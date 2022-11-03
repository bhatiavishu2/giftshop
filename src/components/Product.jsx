import React, { useState, useContext } from "react";
import { CartDispatchContext, addToCart } from "contexts/cart";
import { AuthStateContext } from "contexts/auth";
import { imagesUrl} from "../constants";
import { confirmAlert } from 'react-confirm-alert';
import {Permissions} from '../constants/common'
import ReactWhatsapp from 'react-whatsapp';

const ProductCard = ({ data, onPreview , onClick, onDelete, onEdit}) => {
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useContext(CartDispatchContext);
  const authState = useContext(AuthStateContext);
  const { categoryImage,images, name, price, id, stock, productDescription, shippingCharges } = data;

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
      <div>
      <div className="product-image">
        <img src={`${imagesUrl}/${categoryImage || (images && images[0])}`} alt={name} onClick={()=>onPreview && onPreview(data)} />
      </div>
      {name && <h4 className="product-name">{name}</h4>}
    <div> {price && <p className="product-price">{price}</p>}
     {shippingCharges && <p className="product-price shipping-charges">{shippingCharges || 0} (Shipping Charges)</p>}
     </div>
     {authState.hasPermissions([Permissions.DELETE_CATEGORY, Permissions.DELETE_PRODUCT]) && <button className="outline delete-icon" onClick={async (e) => {
      e.stopPropagation()
      confirmAlert({
        title: 'Confirm to Delete',
        message: 'Are you sure you want to delete?.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => onDelete(data)
          },
          {
            label: 'No',
            onClick: () => ({})
          }
        ]
      });
     
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
      {onPreview && <ReactWhatsapp className="whatsapp" number="+91-9818855029" message={`${window.location.href}?productId=${data.id}`} ><img src="/whatsapp.png" width="50" alt="whatsapp"/></ReactWhatsapp>}
    </div>
  );
};

export default ProductCard;
