import React, { useRef, useEffect } from "react";
import { findDOMNode } from "react-dom";
import { imagesUrl } from "../constants";
import { Carousel } from "react-responsive-carousel";

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

  const {categoryImage, images} = props.product
    return (
      <div
        className={
          props.openModal ? "modal-wrapper active" : "modal-wrapper"
        }
      >
        <div className="modal1" ref={modalElement}>
          <button
            type="button"
            className="close"
            onClick={handleClose.bind(this)}
          >
            &times;
          </button>
          <div className="quick-view">
            <div className="quick-view-image">
      <Carousel showArrows={false} infiniteLoop showThumbs={false} showStatus={true} autoFocus={false} >
              {images.map((image,index)=><img key={index} src={`${imagesUrl}/${image}`} alt={props.product.name}  />)}
            </Carousel>
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