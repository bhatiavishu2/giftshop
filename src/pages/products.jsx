import React, { useEffect, useContext, useState } from "react";
import ProductCard from "components/Product";
import QuickView from "components/QuickView";
import { useQuery, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { getProducts, deleteProduct } from "graphql/products";
import { CommonStateContext } from "contexts/common";
import { Link } from "react-router-dom";
const color = "#" + (((1 << 24) * Math.random()) | 0).toString(16);
const Product = ({ match }) => {
  const { searchKeyword } = useContext(CommonStateContext);
  const history = useHistory();
  const {
    loading: isLoading,
    error,
    data = {},
    refetch
  } = useQuery(getProducts, {
    variables: { categoryId: match?.params?.categoryId }
  });
  const params = new Proxy(new URLSearchParams(history.location.search), {
    get: (searchParams, prop) => searchParams.get(prop)
  });
  useEffect(() => {
    refetch();
  }, []);
  const [deleteItem] = useMutation(deleteProduct);
  const [previewData, setPreviewData] = useState(null);
  const [modalActive, setModalActive] = useState(false);
  const { products, category } = data;
  let productsList =
    products &&
    products.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        !searchKeyword
      );
    });

  if (params.productId) {
    productsList =
      productsList &&
      productsList.filter((product) => product.id === params.productId);
  }
  if (params.subCategoryId) {
    productsList =
      productsList &&
      productsList.filter(
        (product) => product.subCategory === params.subCategoryId
      );
  }

  const onPreview = (data) => {
    setPreviewData(data);
    setModalActive(true);
  };
  const closeModal = () => {
    setModalActive(false);
  };
  const handleOnDelete = async (data) => {
    await deleteItem({ variables: { id: data.id } });
    await refetch();
  };
  const handleOnEdit = (data) => {
    history.push(`/editProduct/${data.id}`);
  };

  if (isLoading) {
    return (
      <div className="products-wrapper">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="products-wrapper container">
      <div className=" products">
        <Link
          style={{
            color: "black",
            textDecoration: "none",
            maxHeight: '100px'
          }}
          to={`/products/${match?.params?.categoryId}`}
        >
          {" "}
          <span className="sub-category-icon">
            <label style={{ background: color }} className="sub-category-label">
              A
            </label>
            <h5 style={{ color: color }} className="sub-category-text">
              All
            </h5>
          </span>
        </Link>
        {category.subCategories.map((sc, index) => {
          return (
            <Link
              style={{
                color: "black",
                textDecoration: "none",
                maxHeight: '100px'
              }}
              to={`/products/${match?.params?.categoryId}?subCategoryId=${sc.id}`}
            >
              {" "}
              <span className="sub-category-icon">
                <label
                  style={{ background: color }}
                  className="sub-category-label"
                >
                  {sc.name[0]}
                </label>
                <h5 style={{ color: color }} className="sub-category-text">
                  {sc.name}
                </h5>
              </span>
            </Link>
          );
        })}
      </div>
      <div className="products total-products-wrapper"><label className="total-products"> Total {productsList.length} Products</label></div>
      <div className=" products">
        {products &&
          productsList.map((data) => {
            return (
              <ProductCard
                onEdit={handleOnEdit}
                onDelete={handleOnDelete}
                onPreview={onPreview}
                key={data.id}
                data={data}
              />
            );
          })}
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

export default Product;
