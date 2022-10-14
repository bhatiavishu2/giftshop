import React, { useContext, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import _get from "lodash.get";
import { AuthDispatchContext, signIn } from "contexts/auth";
import Input from "components/core/form-controls/Input";
import {login, context} from 'graphql/auth';
import {  useMutation, useLazyQuery } from '@apollo/client';

const ProductSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    price: Yup.string().required("Price is required!"),
    images: Yup.string().required("images are required"),
    category: Yup.string().required("Category is required!"),
});

const CreateProduct = () => {
  const authDispatch = useContext(AuthDispatchContext);
  const history = useHistory();
  const location = useLocation();
  const [submitLogin] = useMutation(login);
  const [
    getContext, 
    { loading, data }
  ] = useLazyQuery(context);
  const fromUrl = _get(location, "state.from.pathname");
  console.log("location => ", location);
  const goToForgotPassword = (e) => {
    e.preventDefault();
  };

  const goToRegister = (e) => {
    e.preventDefault();
    history.push("/register");
  };

  useEffect(()=>{
    if(data){
      signInSuccess(data);
    }
  },[data]);

  const signInSuccess = (userData) => {
    signIn(authDispatch, userData);
    if (fromUrl) {
      history.push(fromUrl);
    } else {
      history.push("/");
    }
  };

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
          const userData = await submitLogin({ variables:
            values
          });
          getContext({ variables:
            {token:userData?.data?.login?.token}
          });
         
        } catch (err) {
          console.error(err);
        }
      }}
    >
      {() => (
        <Form>
          <Field
            name="name"
            type="text"
            placeholder="Product Name"
            component={Input}
          />
          <Field
            name="price"
            type="text"
            placeholder="Price"
            component={Input}
          />
           <Field
            name="images"
            type="file"
            placeholder="Images"
            component={Input}
            multiple
            accept="image/png, image/gif, image/jpeg"
          />
           <Field
            name="category"
            type="text"
            placeholder="Category"
            component={Input}
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
