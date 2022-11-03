import React, { useContext, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import _get from "lodash.get";
import Input from "components/core/form-controls/Input";
import {createPermission} from 'graphql/permissions'
import {  useMutation } from '@apollo/client';
import { useHistory } from "react-router-dom";

const ProductSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
});

const CreateProduct = () => {
  const [submitLogin] = useMutation(createPermission);
  const history = useHistory()

  return (
    <Formik
      initialValues={{
        name: "",
      }}
      validationSchema={ProductSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          await submitLogin({ variables:
            values
          });
          resetForm();
          history.push('/permissions')
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
            placeholder="Permission Name"
            component={Input}
          />
          <button className="auth-button block" onClick={() => {}}>
            Create Permission
          </button>

        
        </Form>
      )}
    </Formik>
  );
};

export default CreateProduct;
