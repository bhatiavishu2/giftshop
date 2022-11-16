import React, { useContext, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import _get from "lodash.get";
import {createAboutUs, getAboutUs} from 'graphql/about'
import {  useMutation,useQuery } from '@apollo/client';
import { useHistory } from "react-router-dom";
import HTMLEditor from "components/core/form-controls/HTMLEditor";

const ProductSchema = Yup.object().shape({
    html: Yup.string().required("html is required!"),
});

const CreateProduct = () => {
  const [submitLogin] = useMutation(createAboutUs);
  const  { loading:isLoading, error, data = {} } = useQuery(getAboutUs);
  const history = useHistory()
  if(isLoading) return null;
  return (
    <Formik
      initialValues={{
        html: "",
        ...data.about
      }}
      validationSchema={ProductSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          await submitLogin({ variables:
            values
          });
          resetForm();
          history.push('/aboutUs')
        } catch (err) {
          console.error(err);
        }
      }}
    >
      {({setFieldValue}) => (
        <Form  className="form-container">
          <Field
            name="html"
            type="text"
            placeholder="About Us"
            component={HTMLEditor}
            setFieldValue={setFieldValue}
          />
          <button className="auth-button block" onClick={() => {}}>
            Create About US
          </button>

        
        </Form>
      )}
    </Formik>
  );
};

export default CreateProduct;
