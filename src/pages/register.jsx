import React, { useContext, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import _get from "lodash.get";
import Input from "components/core/form-controls/Input";
import {createUser} from 'graphql/auth';
import {  useMutation } from '@apollo/client';

const LoginSchema = Yup.object().shape({
  password: Yup.string().required("Password is required!"),
  phone: Yup.string().required("Mobile Number is required!"),
  name: Yup.string().required("Name is required!")
});

const Register = () => {
  const history = useHistory();
  const location = useLocation();
  const [submitRegister] = useMutation(createUser);

  const fromUrl = _get(location, "state.from.pathname");

  const goToLogin = (e) => {
    e.preventDefault();
    history.push("/auth");
  };



  const registerSuccess = () => {
    if (fromUrl) {
      history.push(fromUrl);
    } else {
      history.push("/auth");
    }
  };

  return (
    <Formik
      initialValues={{
        phone: "",
        password: "",
        name:''
      }}
      validationSchema={LoginSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          const userData = await submitRegister({ variables:
            values
          });
          if(userData){
            registerSuccess()
          }
        } catch (err) {
          console.error(err);
        }
      }}
    >
      {() => (
        <Form>
          <Field
            name="phone"
            type="text"
            placeholder="Mobile Number"
            component={Input}
          />
             <Field
            name="name"
            type="name"
            placeholder="Name"
            component={Input}
          />
          <Field
            name="password"
            type="password"
            placeholder="Password"
            component={Input}
          />

          <button className="auth-button block" onClick={() => {}}>
            Register
          </button>

          <p>
            Already Registered?{" "}
            <a href="/#" onClick={goToLogin}>
              Login Now!
            </a>
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default Register;
