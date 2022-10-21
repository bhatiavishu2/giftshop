import React, { useState, useContext } from "react";
import { CartDispatchContext, addToCart } from "contexts/cart";
import { imagesUrl } from "../constants";

const ProductCard = ({ data, onPreview , onClick}) => {
  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useContext(CartDispatchContext);
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
