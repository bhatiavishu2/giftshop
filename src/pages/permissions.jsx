import React, { useEffect, useContext, useState } from "react";
import Table from "components/core/Table"
import {  useQuery,useMutation } from '@apollo/client';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  getPermissions,
  deletePermission
} from "graphql/permissions";
import { CommonStateContext } from "contexts/common";

const Permissions = () => {
  const { searchKeyword } = useContext(CommonStateContext);
  const history = useHistory();
  const { loading:isLoading, error, data = {}, refetch } = useQuery(getPermissions);
  const params = new Proxy(new URLSearchParams(history.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  useEffect(()=>{refetch()},[])
  const [deleteItem] = useMutation(deletePermission);
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
    history.push(`/editPermission/${data.id}`);
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
          <Link to="/createPermission" className="btn btn-dark" style={{width:'200px'}}>
            Create Permission
          </Link>
        <Table onEdit={handleOnEdit} data={data.permissions} onDelete={handleOnDelete}/>
        
      </div>
  );
};

export default Permissions;
