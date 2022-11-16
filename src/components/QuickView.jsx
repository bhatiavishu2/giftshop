import React, { useRef, useEffect, useContext } from "react";
import { findDOMNode } from "react-dom";
import { AuthStateContext } from "contexts/auth";
import { getMedia } from "utils";
import { Carousel } from "react-responsive-carousel";
import { imagesUrl } from "../constants";

const QuickView = (props) => {
  const modalElement = useRef();
  const authState = useContext(AuthStateContext);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside.bind(this), true);
    return () => {
      document.removeEventListener(
        "click",
        handleClickOutside.bind(this),
        true
      );
    };
  }, []);

  const handleClickOutside = (event) => {
    const domNode = findDOMNode(modalElement.current);
    if (!domNode || !domNode.contains(event.target)) {
      props.closeModal();
    }
  };

  const handleClose = () => {
    props.closeModal();
  };

  const { categoryImage, images } = props.product;
  const uniqueImages = [...new Set(images)];
  return (
    <div className={props.openModal ? "modal-wrapper active" : "modal-wrapper"}>
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
            <Carousel
              showArrows={false}
              infiniteLoop
              showThumbs={false}
              showStatus={true}
              autoFocus={false}
            >
              {uniqueImages.map((image, index) => (
                <div className="image-wrapper">
                  {getMedia({ image, index, autoPlay: false })}
                  <a
                    className="download-image"
                    style={{ margin: "10px", fontSize: "10px" }}
                    href={`${imagesUrl}/${image}`} //"https://api.mbgroup.shop/static/1667891057438-picture.apk"
                    download
                    target={"_blank"}
                    rel="noreferrer"
                  >
                    <img src="/download.png" width={35} alt="download" />
                  </a>
                </div>
              ))}
            </Carousel>
            {props.product.videoUrl && (
              <a
                className="product-description"
                target={"_blank"}
                href={props.product.videoUrl}
                rel="noreferrer"
              >
                Click here to see video
              </a>
            )}
            {props.product.productDescription && (
              <p
                className="product-description"
                dangerouslySetInnerHTML={{
                  __html: props.product.productDescription
                }}
              ></p>
            )}
          </div>
          <div className="quick-view-details">
            <span className="product-name">{props.product.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;
