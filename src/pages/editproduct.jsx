import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import _get from "lodash.get";
import Input from "components/core/form-controls/Input";
import Select from "components/core/form-controls/Select";
import HTMLEditor from "components/core/form-controls/HTMLEditor";
import { getCategories} from 'graphql/category';
import { useHistory } from "react-router-dom";
import {  useMutation, useQuery } from '@apollo/client';
import {uploadImages} from 'graphql/upload'
import {updateProduct, getProductById, createProduct} from 'graphql/products'
import CheckboxInput, { Checkbox } from "components/core/form-controls/Checkbox";
const ProductSchema = Yup.object().shape({
    name: Yup.string().required("Name is required!"),
    price: Yup.string().required("Price is required!"),
    shippingCharges: Yup.string().required("Shipping Charges is required!"),
    wholeSalePrice:Yup.string().required("Price is required!"),
    subCategory: Yup.string().required("Sub Category is required!"),
    productDescription: Yup.string().required("Product Description is required!"),
});

const EditProduct = ({match}) => {
  const { loading:isLoading, error, data = {} } = useQuery(getCategories);
  const [submitLogin] = useMutation(updateProduct);
  const [submitCreateProduct] = useMutation(createProduct);
  const{categories = []} = data
  const history = useHistory();
  const  { loading:productLoading, data: productData  ={} } = useQuery(getProductById, {variables:{
    id: match?.params?.id
  }});
  if(productLoading || isLoading){
    return null
  }
  const {product:{subCategoryDetails , ...restProductData}={}} = productData 

  return (
    <Formik
      initialValues={{
        name: "",
        price: "",
        wholeSalePrice:"",
        category: "",
        subCategory:"",
        shippingCharges:"",
        localShippingCharges:"",
        images:[],
        productDescription:"",
        file:[],
        previewFile: "",
        isOutOfStock:false,
        copyToOtherCategory: false,
        videoUrl:"",
        ...restProductData,
        category: subCategoryDetails.categoryDetails
      }}
      validationSchema={ProductSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          if(values.copyToOtherCategory) {
            await submitCreateProduct({ variables:
              values,
               id:match?.params?.id
            });
          } else {
         await submitLogin({ variables:
            values,
             id:match?.params?.id
          });
        }
          history.push(`/products/${subCategoryDetails.categoryDetails.id}`);
         
        } catch (err) {
          console.error(err);
        }
      }}
    >
      {({values,setFieldValue}) => (
        <Form className="form-container">
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
            name="localShippingCharges"
            type="text"
            placeholder="Local Shipping Charges"
            component={Input}
          />
            <Field
            name="shippingCharges"
            type="text"
            placeholder="Shipping Charges"
            component={Input}
          />
        
          <Field
            name="productDescription"
            type="text"
            placeholder="Product Description"
            component={HTMLEditor}
            setFieldValue={setFieldValue}
          />
            <Field
            name="videoUrl"
            type="text"
            placeholder="Video URL"
            component={Input}
          />

          <Field
            component={Checkbox}
            name="isOutOfStock"
            id="isOutOfStock"
            label={"Out Of Stock"}
            icon={ ""}
            value={values.isOutOfStock}
          />
            <Field
            name="category"
            type="text"
            placeholder="Category"
            component={Select}
          

            options={categories.map(c => ({name:c.name, value: c, label:c.name}))}
          />
           <Field
            name="subCategory"
            type="text"
            placeholder="Sub Category"
            component={Select}
            options={(values.category?.subCategories || []).map(c => ({name:c.name, value: c.id, label:c.name}))}
          />
             Images: 
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
             Catelog File:
          <Field
            name="previewFile"
            type="file"
            value={undefined}
            placeholder="Images"
            component={Input}
            onChange={(event) => {
              setFieldValue("previewFile", event.currentTarget.files);
            }}
          />

<Field
            component={Checkbox}
            name="copyToOtherCategory"
            id="copyToOtherCategory"
            label={"Copy to other category"}
            icon={ ""}
            value={values.isOutOfStock}
          />
           
           <button disabled={values.file.length === 0} className="auth-button block" onClick={async (e) => {
              e.preventDefault()
              e.stopPropagation();
             const result =  await uploadImages(values.file);
            const {data:{files = [ ]}} = await result.json()
             setFieldValue("images", files);
            }}>
            Upload Image
          </button>
          <button disabled={!values.previewFile} className="auth-button block" onClick={async (e) => {
              e.preventDefault()
              e.stopPropagation();
             const result =  await uploadImages(values.previewFile);
            const {data:{files = [ ]}} = await result.json()
             setFieldValue("previewFile", files[0]);
            }}>
            Upload Preview File
          </button>
          <button className="auth-button block" disabled={values.images.length === 0} onClick={() => {}}>
            {!values.copyToOtherCategory?'Update Product':'Create Product'}
          </button>

        
        </Form>
      )}
    </Formik>
  );
};

export default EditProduct;
