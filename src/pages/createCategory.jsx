import React, { useContext, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import _get from "lodash.get";
import { AuthDispatchContext, signIn } from "contexts/auth";
import Input from "components/core/form-controls/Input";
import {createCategory} from 'graphql/category';
import {  useMutation, useLazyQuery } from '@apollo/client';
import {uploadImages} from 'graphql/upload'

const ProductSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
});

const CreateCategory = () => {
  const authDispatch = useContext(AuthDispatchContext);
  const history = useHistory();
  const location = useLocation();
  const [submitCategory] = useMutation(createCategory);

 
  return (
    <Formik
      initialValues={{
        name: "",
        categoryImage:'',
        file:[]
      }}
      validationSchema={ProductSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          await submitCategory({ variables:
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
      {({isSubmitting,values, setFieldValue}) => (
        <Form>
          <Field
            name="name"
            type="text"
            placeholder="Category Name"
            component={Input}
          />
       
           <Field
            name="categoryImage"
            type="file"
            placeholder="Category Image"
            component={Input}
            value={undefined}
    
            accept="image/png, image/gif, image/jpeg"
            onChange={(event) => {
              setFieldValue("file", event.currentTarget.files);
            }}
           
          />

            <button disabled={values.file.length === 0 || values.categoryImage} className="auth-button block" onClick={async (e) => {
              e.preventDefault()
              e.stopPropagation();
             const result =  await uploadImages(values.file);
            const {data:{files = [ ]}} = await result.json()
             setFieldValue("categoryImage", files[0]);
            }}>
            Upload Image
          </button>

  
          <button className="auth-button block" disabled={isSubmitting || !values.categoryImage} onClick={() => {}}>
            Create Category
          </button>

        
        </Form>
      )}
    </Formik>
  );
};

export default CreateCategory;
