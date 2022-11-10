import React, { useEffect, useContext, useState } from "react";
import ProductCard from "components/Product";
import { useQuery, useMutation } from "@apollo/client";
import QuickView from "components/QuickView";
import { useHistory } from "react-router-dom";
import { getLatestProducts, deleteProduct } from "graphql/products";
import { getCategories, deleteCategory } from "graphql/category";
import { Parallax, Background } from "react-parallax";

const Home = () => {
  const history = useHistory();
  const { loading, data: { categories } = {} } = useQuery(getCategories);
  const {
    loading: latestProductLoading,
    data: { latestProducts = [] } = {},
    refetch
  } = useQuery(getLatestProducts, { variables: { limit: 5 } });
  const [deleteItem] = useMutation(deleteCategory);
  const [deleteProductItem] = useMutation(deleteProduct);
  const [previewData, setPreviewData] = useState(null);
  const [modalActive, setModalActive] = useState(false);
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

  if (latestProductLoading || loading) {
    return (
      <div className="products-wrapper">
        <h1>Loading...</h1>
      </div>
    );
  }

  const onProductPreview = (data) => {
    setPreviewData(data);
    setModalActive(true);
  };
  const closeModal = () => {
    setModalActive(false);
  };
  const handleProductOnDelete = async (data) => {
    await deleteProductItem({ variables: { id: data.id } });
    await refetch();
  };
  const handleProductOnEdit = (data) => {
    history.push(`/editProduct/${data.id}`);
  };
  
  return (
    <div
    style={{
      backgroundImage: "url('/bg.jpeg')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center center"
    }}
    >
      <div className="container">
   
        <div className="products-wrapper"    >
          <h3
            className="heading"
            style={{ textAlign: "center", paddingTop: "20px" }}
          >
            Recent Updated Products
          </h3>
          <Parallax bgImage={'/recent.jpeg'} strength={500}>
          <div  className="products latest-products">
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
          </Parallax>
        </div>
      
        <div className="product-wrapper">
          <h3
            className="heading"
            style={{ textAlign: "center", paddingTop: "20px" }}
          >
            All Categories
          </h3>
          <div className="products all-categories">
            {categories &&
              categories.map((data) => {
                return (
                  <ProductCard
                    onEdit={handleOnEdit}
                    onDelete={handleOnDelete}
                    key={data.id}
                    data={data}
                    onClick={() => onPreview(data)}
                  />
                );
              })}
          </div>
        </div>
      </div>
      {previewData && (
        <QuickView
          product={previewData}
          openModal={modalActive}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default Home;
