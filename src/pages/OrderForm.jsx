import React, { useContext, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import _get from "lodash.get";
import Input from "components/core/form-controls/Input";
import { createCustomOrder } from "graphql/customOrder";
import { useMutation } from "@apollo/client";

const LoginSchema = Yup.object().shape({
  name: Yup.string().required("Name is required!"),
  phone: Yup.string().required("Mobile Number is required!"),
  itemName: Yup.string().required("Item Name is required!"),
  address: Yup.string().required("Address is required!"),
  city: Yup.string().required("City is required!"),
  state: Yup.string().required("State is required!"),
  pinCode: Yup.string().required("Pin Code is required!")
});

const OrderForm = () => {
  const history = useHistory();
  const location = useLocation();
  const [submitOrder] = useMutation(createCustomOrder);

  const fromUrl = _get(location, "state.from.pathname");

  const registerSuccess = (userData) => {
    console.log(userData);
    if (fromUrl) {
      history.push(fromUrl);
    } else {
      history.push(`/my-order?id=${userData?.data?.createCustomOrder?.id}`);
    }
  };

  return (
    <Formik
      initialValues={{
        name: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        pinCode: "",
        itemName: ""
      }}
      validationSchema={LoginSchema}
      onSubmit={async (values, { resetForm }) => {
        try {
          const userData = await submitOrder({ variables: values });
          if (userData) {
            registerSuccess(userData);
          }
        } catch (err) {
          console.error(err);
        }
      }}
    >
      {() => (
        <Form>
          <Field name="name" type="text" placeholder="Name" component={Input} />
          <Field
            name="phone"
            type="text"
            placeholder="Mobile Number"
            component={Input}
          />
          <Field
            name="address"
            type="text"
            placeholder="Address"
            component={Input}
          />
          <Field name="city" type="text" placeholder="City" component={Input} />
          <Field
            name="state"
            type="text"
            placeholder="State"
            component={Input}
          />
          <Field
            name="pinCode"
            type="text"
            placeholder="Pin Code"
            component={Input}
          />
          <Field
            name="itemName"
            type="text"
            placeholder="Item Name"
            component={Input}
          />

          <button className="auth-button block" onClick={() => {}}>
            Submit Order
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default OrderForm;
