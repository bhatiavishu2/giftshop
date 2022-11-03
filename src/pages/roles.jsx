import React, { useEffect, useContext, useState } from "react";
import Table from "components/core/Table"
import {  useQuery,useMutation } from '@apollo/client';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  getRoles,
  deleteRole
} from "graphql/roles";
import { CommonStateContext } from "contexts/common";

const Roles = () => {
  const { searchKeyword } = useContext(CommonStateContext);
  const history = useHistory();
  const { loading:isLoading, error, data = {}, refetch } = useQuery(getRoles);
  const params = new Proxy(new URLSearchParams(history.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  useEffect(()=>{refetch()},[])
  const [deleteItem] = useMutation(deleteRole);
  const [previewData, setPreviewData] = useState(null)
  const [modalActive, setModalActive] = useState(false)
  const { products} = data ;
  let productsList =
    products &&
    products.filter((product) => {
      return (
        product.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        !searchKeyword
      );
    });

    if(params.productId){
      productsList = productsList && productsList.filter(product => product.id === params.productId)
    }


  const onPreview = (data) =>{
    setPreviewData(data)
    setModalActive(true)
  }
  const closeModal = () => {
    setModalActive(false);
  }
  const handleOnDelete = async (data) =>{
    await deleteItem({ variables:
      {id:data.id}
    })
    await refetch()
  }
  const handleOnEdit = (data) => {
    history.push(`/editRole/${data.id}`);
  }

  if (isLoading) {
    return (
      <div className="products-wrapper">
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div style={{display:'flex', flexDirection:'column', alignItems: 'center'}}>
          <Link to="/createRole" className="btn btn-dark" style={{width:'200px'}}>
            Create Role
          </Link>
        <Table onEdit={handleOnEdit} data={data.roles} onDelete={handleOnDelete}/>
        
      </div>
  );
};

export default Roles;
