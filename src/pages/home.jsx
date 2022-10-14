import React, { useEffect, useContext } from "react";
import ProductCard from "components/Product";
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
  const { loading:isLoading, error, products } = useQuery(getProducts);
  const productsList =
    products &&
    products.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        !searchKeyword
      );
    });

  // useEffect(() => {
  //   getProducts(dispatch);
  // }, []);

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
            return <ProductCard key={data.id} data={data} />;
          })}
      </div>
    </div>
  );
};

export default Home;
