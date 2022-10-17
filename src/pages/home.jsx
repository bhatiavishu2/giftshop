import React, { useEffect, useContext, useState } from "react";
import ProductCard from "components/Product";
import QuickView from "components/QuickView"
import {  useQuery } from '@apollo/client';
import {
  ProductsStateContext,
  ProductsDispatchContext,

} from "contexts/products";
import {
  getProducts
} from "graphql/products";
import { CommonStateContext } from "contexts/common";

const Home = () => {
  const { searchKeyword } = useContext(CommonStateContext);
  const dispatch = useContext(ProductsDispatchContext);
  const { loading:isLoading, error, data = {} } = useQuery(getProducts);
  const [previewData, setPreviewData] = useState({})
  const [modalActive, setModalActive] = useState(false)
  const { products} = data ;
  const productsList =
    products &&
    products.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        !searchKeyword
      );
    });
    console.log(products)

  // useEffect(() => {
  //   getProducts(dispatch);
  // }, []);

  const onPreview = (data) =>{
    setPreviewData(data)
    setModalActive(true)
  }
  const closeModal = () => {
    setModalActive(false);
  }

  if (isLoading) {
    return (
      <div className="products-wrapper">
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div className="products-wrapper">
      <div className="products">
        {products &&
          productsList.map((data) => {
            return <ProductCard onPreview={onPreview} key={data.id} data={data} />;
          })}
            <QuickView
          product={previewData}
          openModal={modalActive}
          closeModal={closeModal}
        />
      </div>
    </div>
  );
};

export default Home;
