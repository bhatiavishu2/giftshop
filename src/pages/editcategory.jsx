import React, { useContext, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import _get from "lodash.get";
import { AuthDispatchContext, signIn } from "contexts/auth";
import Input from "components/core/form-controls/Input";
import {updateCategory, getCategoryById} from 'graphql/category';
import {  useMutation, useQuery } from '@apollo/client';
import {uploadImages} from 'graphql/upload'

const ProductSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
});

const EditCategory = ({match}) => {
  const authDispatch = useContext(AuthDispatchContext);
  const history = useHistory();
  const location = useLocation();
  const [submitCategory] = useMutation(updateCategory);
  console.log(location)
  const  { loading:isLoading, error, data = {} } = useQuery(getCategoryById, {variables:{
    id: match?.params?.categoryId
  }});

  if(isLoading){
    return null
  }
 
  return (
    <Formik
      initialValues={{
        name: "",
        categoryImage:'',
        file:[],
        ...data.category,
      }}
      validationSchema={ProductSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          await submitCategory({ variables:
            {...values, categoryId:match?.params?.categoryId}
          });
          
          history.push("/");
         
        } catch (err) {
          console.error(err);
        }
      }}
    >
      {({isSubmitting,values, setFieldValue}) => (
        <Form className="form-container">
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

            <button disabled={values.file.length === 0} className="auth-button block" onClick={async (e) => {
              e.preventDefault()
              e.stopPropagation();
             const result =  await uploadImages(values.file);
            const {data:{files = [ ]}} = await result.json()
             setFieldValue("categoryImage", files[0]);
            }}>
            Upload Image
          </button>

  
          <button className="auth-button block" disabled={isSubmitting || !values.categoryImage} onClick={() => {}}>
            Update Category
          </button>

        
        </Form>
      )}
    </Formik>
  );
};

export default EditCategory;
