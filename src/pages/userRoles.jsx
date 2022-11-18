import React, { useEffect, useContext, useState } from "react";
import Table from "components/core/Table"
import {  useQuery,useMutation } from '@apollo/client';
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import {
  getUsers,
  deleteUser
} from "graphql/auth";
import { CommonStateContext } from "contexts/common";

const Roles = () => {
  const history = useHistory();
  const { loading:isLoading, error, data = {}, refetch } = useQuery(getUsers);
  const params = new Proxy(new URLSearchParams(history.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  useEffect(()=>{refetch()},[])
  const [deleteItem] = useMutation(deleteUser);
 
  const handleOnDelete = async (data) =>{
    await deleteItem({ variables:
      {id:data.id}
    })
    await refetch()
  }
  const handleOnEdit = (data) => {
     history.push(`/editUserRole/${data.id}`);
  }

  if (isLoading) {
    return (
      <div className="products-wrapper">
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div  className="container">
          <Link to="/createUserRole" className="btn btn-dark" style={{width:'200px'}}>
            Create User Role
          </Link>
        <Table onEdit={handleOnEdit} data={data.users.map(rm=> ({...rm,...rm.userRoles}))} onDelete={handleOnDelete}/>
        
      </div>
  );
};

export default Roles;
