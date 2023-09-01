import React, { useEffect, useContext, useState } from "react";
import Table from "components/core/Table";
import { useQuery, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

import { getOrders } from "graphql/customOrder";
import { CommonStateContext } from "contexts/common";

const Permissions = () => {
  const { searchKeyword } = useContext(CommonStateContext);
  const history = useHistory();
  const { loading: isLoading, error, data = {}, refetch } = useQuery(getOrders);
  const params = new Proxy(new URLSearchParams(history.location.search), {
    get: (searchParams, prop) => searchParams.get(prop)
  });
  useEffect(() => {
    refetch();
  }, []);
  // const [deleteItem] = useMutation(deletePermission);
  const [previewData, setPreviewData] = useState(null);
  const [modalActive, setModalActive] = useState(false);
  const { products } = data;
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

  const handleOnDelete = async (data) => {
    // await deleteItem({ variables:
    //   {id:data.id}
    // })
    await refetch();
  };
  const handleOnEdit = (data) => {
    // history.push(`/editPermission/${data.id}`);
  };

  if (isLoading) {
    return (
      <div className="products-wrapper">
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div className="container">
      <Table
        onEdit={handleOnEdit}
        data={data.customOrders}
        onDelete={handleOnDelete}
      />
    </div>
  );
};

export default Permissions;
