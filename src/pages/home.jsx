import React, { useEffect, useContext, useState } from "react";
import ProductCard from "components/Product";
import {  useQuery, useMutation } from '@apollo/client';
import { useHistory } from "react-router-dom";
import { getCategories, deleteCategory } from "graphql/category";

const Home = () => {
  const history = useHistory();
  const {loading:categoryLoading, data :{categories}  = {}, refetch} = useQuery(getCategories);
  const [deleteItem] = useMutation(deleteCategory);
  useEffect(()=>{refetch()},[])

  const onPreview = (data) =>{
    history.push(`/products/${data.id}`);
  }
  const handleOnDelete = async (data) =>{
    await deleteItem({ variables:
      {id:data.id}
    })
    await refetch()
  }

  const handleOnEdit = (data) => {
    history.push(`/categories/${data.id}`);
  }

  if (categoryLoading) {
    return (
      <div className="products-wrapper">
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div className="products-wrapper">
      <div className="container products"> 
      { 
        categories && categories.map((data) => {
          return <ProductCard onEdit={handleOnEdit} onDelete={handleOnDelete}  key={data.id} data={data} onClick={()=>onPreview(data)}/>;
        })}
      </div>
    </div>
  );
};

export default Home;
