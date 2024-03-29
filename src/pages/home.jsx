import React, { useEffect, useContext, useState } from "react";
import ProductCard from "components/Product";
import { useQuery, useMutation } from "@apollo/client";
import QuickView from "components/QuickView";
import { useHistory } from "react-router-dom";
import { deleteProduct } from "graphql/products";
import { deleteCategory } from "graphql/category";
import { Permissions } from "../constants/common";
import { AuthStateContext } from "contexts/auth";
import { getHomePageData } from "graphql/home";
import { imagesUrl } from "../constants";
import { Carousel } from "react-responsive-carousel";
import { isMobileAndTablet } from "../utils";
import { Link } from "react-router-dom";
const color = "#" + (((1 << 24) * Math.random()) | 0).toString(16);

const Home = () => {
  const history = useHistory();
  const authState = useContext(AuthStateContext);
  const {
    loading,
    data: { categories, latestProducts = [], banners: [banner] = [], contact,about } = {},
    refetch
  } = useQuery(getHomePageData, {
    variables: { latestProductLimit: 50, bannerLimit: 1 }
  });

  const [deleteItem] = useMutation(deleteCategory);
  const [deleteProductItem] = useMutation(deleteProduct);
  useEffect(() => {
    refetch();
  }, []);

  const onPreview = (data) => {
    history.push(`/products/${data.id}`);
  };
  const handleOnDelete = async (data) => {
    await deleteItem({ variables: { id: data.id } });
    await refetch();
  };

  const handleOnEdit = (data) => {
    history.push(`/categories/${data.id}`);
  };

  if (loading) {
    return (
      <div className="products-wrapper">
        <h1>Loading...</h1>
      </div>
    );
  }
const onProductPreview  = (data) =>{
  history.push(`/pdp/${data.id}`);
}


  const handleProductOnDelete = async (data) => {
    await deleteProductItem({ variables: { id: data.id } });
    await refetch();
  };
  const handleProductOnEdit = (data) => {
    history.push(`/editProduct/${data.id}`);
  };
  let bannerUrls = banner?.bannerUrls;
  if (
    !isMobileAndTablet() &&
    authState.hasPermissions([Permissions.RESELLER, Permissions.SHOPKEEPER])
  ) {
    bannerUrls = banner?.merchantBannerUrls;
  }
  if (isMobileAndTablet()) {
    if (
      authState.hasPermissions([Permissions.RESELLER, Permissions.SHOPKEEPER])
    ) {
      bannerUrls = banner?.merchantMobileBannerUrls;
    } else {
      bannerUrls = banner?.mobileBannerUrls;
    }
  }
  return (
    <div>
      <Carousel
        showArrows={false}
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        autoFocus={false}
        autoPlay
        showIndicators={false}
      >
        {(bannerUrls || "").split(",").map((url) => (
          // <div
          //   className="banner"
          //   style={{
          //     backgroundImage: `url('${imagesUrl}/${url}')`,
          //     backgroundSize: "cover",
          //     backgroundRepeat: "no-repeat",
          //     backgroundPosition: "center center",
          //     height: "400px"
          //   }}
          // />
          <img src={`${imagesUrl}/${url}`} alt="banner" />
        ))}
      </Carousel>
      
      {/* <img src={`${imagesUrl}/${banner.bannerUrl}`} alt="Banner" /> */}
      <div className="container">
      <div className="product-wrapper">
      <h3
            className="heading"
            style={{ textAlign: "center",marginTop: "30px" }}
          >
            All Categories
          </h3>
          <div className="products all-categories">
            {categories &&
              categories.map((data) => {
                  return (
                    <Link
                      style={{
                        color: "black",
                        textDecoration: "none",
                        maxHeight: '100px'
                      }}
                      to={`/products/${data.id}`}
                    >
                      {" "}
                      <span className="sub-category-icon">
                        <label
                          style={{ background: color }}
                          className="sub-category-label"
                        >
                          {data.name[0]}
                        </label>
                        <h5 style={{ color: color }} className="sub-category-text">
                          {data.name}
                        </h5>
                      </span>
                    </Link>
                  );
              })}
          </div>
        </div>
        <div className="products-wrapper">
          <h3
            className="heading"
            style={{ textAlign: "center", paddingTop: "20px" }}
          >
            Recent Updated Products
          </h3>
          {/* <Parallax bgImage={'/recent.jpeg'} strength={500}> */}
          <div className="products latest-products">
            {latestProducts &&
              latestProducts.map((data) => {
                return (
                  <ProductCard
                    onEdit={handleProductOnEdit}
                    onDelete={handleProductOnDelete}
                    onPreview={onProductPreview}
                    key={data.id}
                    data={data}
                  />
                );
              })}
          </div>
          {/* </Parallax> */}
        </div>
       
        <div className="products-wrapper">
          <h3
            className="heading"
            style={{ textAlign: "center", paddingTop: "20px" }}
          >
            About Us
          </h3>
         <div className="about-us"
          dangerouslySetInnerHTML={{
            __html: about.html
          }}
        />
        </div>
        <div className="products-wrapper">
          <h3
            className="heading"
            style={{ textAlign: "center", paddingTop: "20px" }}
          >
            Contact Us
          </h3>
        <div className="contact-us"
          dangerouslySetInnerHTML={{
            __html: contact.html
          }}
        />
        </div>
      </div>

    </div>
  );
};

export default Home;
