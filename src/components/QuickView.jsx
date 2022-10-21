import React, { useRef, useEffect } from "react";
import { findDOMNode } from "react-dom";
import { imagesUrl } from "../constants";

const QuickView = (props) => {
    const modalElement = useRef();

  
  useEffect(() => {
    document.addEventListener(
      "click",
      handleClickOutside.bind(this),
      true
    );
    return ()=>{
        document.removeEventListener(
            "click",
            handleClickOutside.bind(this),
            true
          );
    }
  },[])


 const handleClickOutside =(event) => {
    const domNode = findDOMNode(modalElement.current);
    if (!domNode || !domNode.contains(event.target)) {
      props.closeModal();
    }
  }

 const handleClose = () => {
    props.closeModal();
  }


    return (
      <div
        className={
          props.openModal ? "modal-wrapper active" : "modal-wrapper"
        }
      >
        <div className="modal" ref={modalElement}>
          <button
            type="button"
            className="close"
            onClick={handleClose.bind(this)}
          >
            &times;
          </button>
          <div className="quick-view">
            <div className="quick-view-image">
              <img
                src={`${imagesUrl}/${props.product.categoryImage || (props.product.images && props.product.images[0]) }`}
                alt={props.product.name}
              />
              {props.product.productDescription &&<p className="product-description">{props.product.productDescription}</p>}
            </div>
            <div className="quick-view-details">
              <span className="product-name">{props.product.name}</span>
              {props.product.price && <span className="product-price">{props.product.price}</span>}
            </div>
          </div>
        </div>
      </div>
    );
  
}

export default QuickView;