import React, { useEffect, useContext, useState } from "react";
import ProductCard from "components/Product";
import { useQuery, useMutation } from "@apollo/client";
import QuickView from "components/QuickView";
import { useHistory } from "react-router-dom";
import { getLatestProducts, deleteProduct } from "graphql/products";
import { getCategories, deleteCategory } from "graphql/category";

const Home = () => {
  const history = useHistory();
  const { loading, data: { categories } = {} } = useQuery(getCategories);
  const {
    loading: latestProductLoading,
    data: { latestProducts = [] } = {},
    refetch
  } = useQuery(getLatestProducts, { variables: { limit: 4 } });
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
    <div>
      <div>
        <div className="products-wrapper" >
          <h3 className="container" style={{textAlign:'center', paddingTop:"20px"}}>Recent Updated Products</h3>
        <div className=" container products latest-products">
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
        </div>
        <div>
        <div className=" container products all-categories">
        <h3 className="container" style={{textAlign:'center', paddingTop:"20px"}}>All Categories</h3>
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
