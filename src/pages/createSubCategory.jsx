import React, { useContext, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import _get from "lodash.get";
import { AuthDispatchContext, signIn } from "contexts/auth";
import Input from "components/core/form-controls/Input";
import Select from "components/core/form-controls/Select";
import {getCategories} from 'graphql/category';
import {createSubCategory} from 'graphql/subCategory'
import {  useMutation, useQuery } from '@apollo/client';

const ProductSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    category: Yup.string().required("Category is required!"),
});

const CreateProduct = () => {
  const authDispatch = useContext(AuthDispatchContext);
  const { loading:isLoading, error, data = {} } = useQuery(getCategories);
  const history = useHistory();
  const location = useLocation();
  const [submitLogin] = useMutation(createSubCategory);

 const{categories = []} = data

  return (
    <Formik

      initialValues={{
        name: "",
        price: "",
        images:"",
        category:""
      }}
      validationSchema={ProductSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          await submitLogin({ variables:
            values
          });
          resetForm();
          // getContext({ variables:
          //   {token:userData?.data?.login?.token}
          // });
         
        } catch (err) {
          console.error(err);
        }
      }}
    >
      {() => (
        <Form  className="form-container">
          <Field
            name="name"
            type="text"
            placeholder="Product Name"
            component={Input}
          />
        
           <Field
            name="category"
            type="text"
            placeholder="Category"
            component={Select}
            options={categories.map(c => ({name:c.name, value: c.id, label:c.name}))}
          />
          <button className="auth-button block" onClick={() => {}}>
            Create Product
          </button>

        
        </Form>
      )}
    </Formik>
  );
};

export default CreateProduct;
