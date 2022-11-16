import React, { useContext, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import _get from "lodash.get";
import {createContactUs, getContactUs} from 'graphql/contact'
import {  useMutation,useQuery } from '@apollo/client';
import { useHistory } from "react-router-dom";
import HTMLEditor from "components/core/form-controls/HTMLEditor";

const ProductSchema = Yup.object().shape({
    html: Yup.string().required("html is required!"),
});

const CreateProduct = () => {
  const [submitLogin] = useMutation(createContactUs);
  const  { loading:isLoading, error, data = {} } = useQuery(getContactUs);
  const history = useHistory()
  if(isLoading) return null;
  return (
    <Formik
      initialValues={{
        html: "",
        ...data.contact
      }}
      validationSchema={ProductSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          await submitLogin({ variables:
            values
          });
          resetForm();
          history.push('/contactUs')
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
            placeholder="Contact Us"
            component={HTMLEditor}
            setFieldValue={setFieldValue}
          />
          <button className="auth-button block" onClick={() => {}}>
            Create Contact US
          </button>

        
        </Form>
      )}
    </Formik>
  );
};

export default CreateProduct;
