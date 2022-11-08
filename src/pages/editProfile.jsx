import React, { useContext, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import _get from "lodash.get";
import Input from "components/core/form-controls/Input";
import { updateUser, getUserById } from "graphql/auth";
import { useMutation, useQuery } from "@apollo/client";
import { AuthStateContext } from "contexts/auth";

const LoginSchema = Yup.object().shape({
  phone: Yup.string().required("Mobile Number is required!"),
  name: Yup.string().required("Name is required!"),
  companyName: Yup.string().required("Company Name is required!"),
  address: Yup.string().required("Address is required!")
});

const EditProfile = () => {
  const authState = useContext(AuthStateContext);
  const history = useHistory();
  const location = useLocation();
  const [submitRegister] = useMutation(updateUser);

  const  { loading:userLoading, data: userProfileData  ={} } = useQuery(getUserById, {variables:{
    id: authState.user.context.userId
  }});

  if(userLoading){
    return null;
  }
  const fromUrl = _get(location, "state.from.pathname");

  const goToLogin = (e) => {
    e.preventDefault();
    history.push("/");
  };

  const registerSuccess = () => {
    if (fromUrl) {
      history.push(fromUrl);
    } else {
      history.push("/");
    }
  };

  return (
    <Formik
      initialValues={{
        phone: "",
        password: "",
        name: "",
        companyName: "",
        ...userProfileData.user
      }}
      validationSchema={LoginSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          const userData = await submitRegister({ variables: values });
          if (userData) {
            registerSuccess();
          }
        } catch (err) {
          console.error(err);
        }
      }}
    >
      {() => (
        <Form className="form-container">
          <Field
            name="phone"
            type="text"
            placeholder="Mobile Number"
            component={Input}
            disabled
          />
          <Field name="name" type="text" placeholder="Name" component={Input} />
          <Field
            name="companyName"
            type="text"
            placeholder="Company Name / Shopkeeper Name"
            component={Input}
          />
          <Field
            name="address"
            type="text"
            placeholder="Address"
            component={Input}
          />

          <button className="auth-button block" onClick={() => {}}>
            Update Profile
          </button>

        </Form>
      )}
    </Formik>
  );
};

export default EditProfile;
