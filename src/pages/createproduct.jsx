import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import _get from "lodash.get";
import Input from "components/core/form-controls/Input";
import Select from "components/core/form-controls/Select";
import Textarea from "components/core/form-controls/Textarea"
import { getCategories} from 'graphql/category';
import {  useMutation, useQuery } from '@apollo/client';
import {uploadImages} from 'graphql/upload'
import {createProduct} from 'graphql/products'
const ProductSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    price: Yup.string().required("Price is required!"),
    shippingCharges: Yup.string().required("Shipping Charges is required!"),
    wholeSalePrice:Yup.string().required("Price is required!"),
    subCategory: Yup.string().required("Sub Category is required!"),
    productDescription: Yup.string().required("Product Description is required!"),
});

const CreateProduct = () => {
  const { loading:isLoading, error, data = {} } = useQuery(getCategories);
  const [submitLogin] = useMutation(createProduct);
  const{categories = []} = data

  return (
    <Formik
  
      initialValues={{
        name: "",
        price: "",
        wholeSalePrice:"",
        category: [],
        subCategory:"",
        shippingCharges:"",
        localShippingCharges:"",
        images:[],
        productDescription:"",
        file:[]
      }}
      validationSchema={ProductSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
         await submitLogin({ variables:
            values
          });
          resetForm();
         
        } catch (err) {
          console.error(err);
        }
      }}
    >
      {({values,setFieldValue}) => (
        <Form   className="form-container">
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
            name="wholeSalePrice"
            type="text"
            placeholder="Whole Sale Price"
            component={Input}
          />
            <Field
            name="shippingCharges"
            type="text"
            placeholder="Shipping Charges"
            component={Input}
          />
           <Field
            name="localShippingCharges"
            type="text"
            placeholder="Local Shipping Charges"
            component={Input}
          />
          <Field
            name="productDescription"
            type="text"
            placeholder="Product Description"
            component={Textarea}
          />
            <Field
            name="category"
            type="text"
            placeholder="Category"
            component={Select}
            options={categories.map(c => ({name:c.name, value: c.subCategories, label:c.name}))}
          />
           <Field
            name="subCategory"
            type="text"
            placeholder="Sub Category"
            component={Select}
            options={(values.category|| []).map(c => ({name:c.name, value: c.id, label:c.name}))}
          />
           <Field
            name="file"
            type="file"
            value={undefined}
            placeholder="Images"
            component={Input}
            multiple
            accept="image/*, video/*"
            onChange={(event) => {
              setFieldValue("file", event.currentTarget.files);
            }}
          />
           
           <button disabled={values.file.length === 0 || values.images.length !== 0} className="auth-button block" onClick={async (e) => {
              e.preventDefault()
              e.stopPropagation();
             const result =  await uploadImages(values.file);
            const {data:{files = [ ]}} = await result.json()
             setFieldValue("images", files);
            }}>
            Upload Image
          </button>
          <button className="auth-button block" disabled={values.images.length === 0} onClick={() => {}}>
            Create Product
          </button>

        
        </Form>
      )}
    </Formik>
  );
};

export default CreateProduct;
