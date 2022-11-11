import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Input from "components/core/form-controls/Input";
import { createBanner } from "graphql/banner";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { uploadImages } from "graphql/upload";

const ProductSchema = Yup.object().shape({
  bannerUrl: Yup.string().required("Banner is required!")
});

const CreateProduct = () => {
  const [submitLogin] = useMutation(createBanner);
  const history = useHistory();

  return (
    <Formik
      initialValues={{
        bannerUrl: "",
        file: []
      }}
      validationSchema={ProductSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          await submitLogin({ variables: values });
          resetForm();
          history.push("/");
        } catch (err) {
          console.error(err);
        }
      }}
    >
      {({ values, setFieldValue }) => (
        <Form className="form-container">
          Banner Image:
          <Field
            name="file"
            type="file"
            value={undefined}
            placeholder="Banner"
            component={Input}
            multiple
            accept="image/*, video/*"
            onChange={(event) => {
              setFieldValue("file", event.currentTarget.files);
            }}
          />
          <button
            disabled={values.file.length === 0 || values.bannerUrl.length !== 0}
            className="auth-button block"
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              const result = await uploadImages(values.file);
              const {
                data: { files = [] }
              } = await result.json();
              setFieldValue("bannerUrl", files[0]);
            }}
          >
            Upload Banner
          </button>
          <button className="auth-button block" onClick={() => {}}>
            Create Banner
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateProduct;
