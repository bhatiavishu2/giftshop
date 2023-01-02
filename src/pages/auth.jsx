import React, { useContext, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import _get from "lodash.get";
import { AuthDispatchContext, signIn } from "contexts/auth";
import Input from "components/core/form-controls/Input";
import {login, context} from 'graphql/auth';
import {  useMutation, useLazyQuery } from '@apollo/client';

const LoginSchema = Yup.object().shape({
  password: Yup.string().required("Password is required!"),
  phone: Yup.string().required("Mobile Number is required!")
});

const AuthPage = () => {
  const authDispatch = useContext(AuthDispatchContext);
  const history = useHistory();
  const location = useLocation();
  const [submitLogin] = useMutation(login);
  const [
    getContext, 
    { loading, data }
  ] = useLazyQuery(context);
  const fromUrl = _get(location, "state.from.pathname");

  const goToForgotPassword = (e) => {
    e.preventDefault();
  };

  const goToRegister = (e) => {
    e.preventDefault();
    history.push("/register");
  };

  useEffect(()=>{
    if(data){
      signInSuccess(data);
    }
  },[data]);

  const signInSuccess = (userData) => {
    signIn(authDispatch, userData);
    if (fromUrl) {
      history.push(fromUrl);
    } else {
      history.push("/");
    }
    window.location.reload()
  };

  return (
    <Formik
      initialValues={{
        phone: "",
        password: ""
      }}
      validationSchema={LoginSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          const userData = await submitLogin({ variables:
            values
          });
          localStorage.setItem("token", JSON.stringify(userData?.data?.login?.token));
          getContext({ variables:
            {token:userData?.data?.login?.token}
          });
         
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
            name="password"
            type="password"
            placeholder="Password"
            component={Input}
          />

          <p>
            <a href="/#" onClick={goToForgotPassword}>
              Forgot Password?
            </a>
          </p>
          <button className="auth-button block" onClick={() => {}}>
            Login
          </button>

          <p>
            New here?{" "}
            <a href="/#" onClick={goToRegister}>
              Join as a reseller
            </a>
          </p>
        </Form>
      )}
    </Formik>
  );
};

export default AuthPage;
