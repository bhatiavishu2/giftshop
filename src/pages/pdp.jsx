import { useQuery } from "@apollo/client";
import { getProductById } from "graphql/products";
import { Carousel } from "react-responsive-carousel";
import { AuthStateContext } from "contexts/auth";
import QuickView from "components/QuickView";
import { getMedia } from "utils";
import { imagesUrl } from "../constants";
import { useContext, useState } from "react";
import ReactWhatsapp from "react-whatsapp";
export function PDP({ match }) {
  const authState = useContext(AuthStateContext);
  const [previewData, setPreviewData] = useState(null);
  const [modalActive, setModalActive] = useState(false);
  const { loading: productLoading, data: productData = {} } = useQuery(
    getProductById,
    {
      variables: {
        id: match?.params?.id
      }
    }
  );
  if (productLoading) {
    return null;
  }
  const {
    name,
    price,
    wholeSalePrice,
    images,
    productDescription,
    subCategory,
    shippingCharges,
    isOutOfStock,
    localShippingCharges,
    videoUrl,
    previewFile,
    subCategoryDetails
  } = productData?.product || {};
  const uniqueImages = [...new Set(images)];

  const onPreview = () => {
    setPreviewData(productData?.product);
    setModalActive(true);
  };
  const closeModal = () => {
    setModalActive(false);
  };
  return (
    <div className="pd-wrap">
      <div className="container">
        <div className="heading-section">
          <h2>Product Details</h2>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div id="slider" className="owl-carousel product-slider">
              <Carousel
                showArrows={false}
                infiniteLoop
                showThumbs={true}
                showStatus={true}
                autoFocus={false}
                showIndicators={false}
              >
                {uniqueImages.map((image, index) => (
                  <div
                    className="image-wrapper"
                    style={{ maxHeight: "800px" }}
                    onClick={onPreview}
                  >
                    {getMedia({ image, index, autoPlay: false })}
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
          <div className="col-md-6">
            <div className="product-dtl">
              <div className="product-info">
                <div className="product-name">{name}</div>
                <div className="reviews-counter">
                  {/* <div className="rate">
                    <input
                      type="radio"
                      id="star5"
                      name="rate"
                      defaultValue={5}
                      defaultChecked
                    />
                    <label htmlFor="star5" title="text">
                      5 stars
                    </label>
                    <input
                      type="radio"
                      id="star4"
                      name="rate"
                      defaultValue={4}
                      defaultChecked
                    />
                    <label htmlFor="star4" title="text">
                      4 stars
                    </label>
                    <input
                      type="radio"
                      id="star3"
                      name="rate"
                      defaultValue={3}
                      defaultChecked
                    />
                    <label htmlFor="star3" title="text">
                      3 stars
                    </label>
                    <input
                      type="radio"
                      id="star2"
                      name="rate"
                      defaultValue={2}
                    />
                    <label htmlFor="star2" title="text">
                      2 stars
                    </label>
                    <input
                      type="radio"
                      id="star1"
                      name="rate"
                      defaultValue={1}
                    />
                    <label htmlFor="star1" title="text">
                      1 star
                    </label>
                  </div>
                  <span>3 Reviews</span> */}
                </div>
                {/* <div className="product-price-discount">
                  <span>$39.00</span>
                  <span className="line-through">$29.00</span>
                </div> */}

                <div className="product-price-discount">
                  {" "}
                  {price && (
                    <span className="product-price product-price-discount">
                      {authState.hasPermissions([
                        Permissions.RESELLER,
                        Permissions.SHOPKEEPER
                      ])
                        ? wholeSalePrice
                        : price}{" "}
                      +
                    </span>
                  )}
                  {shippingCharges &&
                    !authState.hasPermissions([Permissions.SHOPKEEPER]) && (
                      <p className="product-price shipping-charges">
                        {Number(shippingCharges)
                          ? shippingCharges
                          : "Free Shipping"}{" "}
                        (Shipping Charges)
                      </p>
                    )}
                  {localShippingCharges &&
                    authState.hasPermissions([Permissions.RESELLER]) && (
                      <p className="product-price shipping-charges">
                        {Number(localShippingCharges)
                          ? localShippingCharges
                          : "Free Shipping"}{" "}
                        (Local Shipping Charges)
                      </p>
                    )}{" "}
                </div>
              </div>
              {videoUrl && (
                <a
                  className="product-description"
                  target={"_blank"}
                  href={videoUrl}
                  rel="noreferrer"
                >
                  Click here to see video
                </a>
              )}
              {productDescription && (
                <p
                  className="product-description"
                  dangerouslySetInnerHTML={{
                    __html: productDescription
                  }}
                ></p>
              )}
              {isOutOfStock ? (
                <div className="out-of-stock">Out Of Stock</div>
              ) : (
                <ReactWhatsapp
                  className="whatsapp"
                  number={
                    authState.hasPermissions([
                      Permissions.RESELLER,
                      Permissions.SHOPKEEPER
                    ])
                      ? "+91-9582611877"
                      : "+91-9818855029"
                  }
                  message={`${window.location.origin}/products/${subCategoryDetails.category}?productId=${match?.params?.id}`}
                >
                  <img src="/whatsapp.png" width="50" alt="whatsapp" />
                </ReactWhatsapp>
              )}
            </div>
          </div>
        </div>
        <div className="product-info-tabs">
    
          <div className="tab-content" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="description"
              role="tabpanel"
              aria-labelledby="description-tab"
            >
              
      

              {previewData && (
                <QuickView
                  product={previewData}
                  openModal={modalActive}
                  closeModal={closeModal}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
