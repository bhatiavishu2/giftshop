import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import classNames from "classnames";
import {
  CheckoutStateContext,
  CheckoutDispatchContext,
  CHECKOUT_STEPS,
  setCheckoutStep,
  saveShippingAddress
} from "contexts/checkout";
import {
  CartStateContext,
  CartDispatchContext,
  clearCart
} from "contexts/cart";
import { AuthStateContext, AuthDispatchContext, signOut } from "contexts/auth";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import _get from "lodash.get";
import Input from "components/core/form-controls/Input";
import { phoneRegExp } from "constants/common";
import { Permissions } from "../constants/common";
import { imagesUrl } from "../constants";
import { useMutation } from "@apollo/client";
import { createOrder } from "graphql/order";
import { uploadImages } from "graphql/upload";

const AddressSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  phoneNumber: Yup.string()
    .required("Phone Number is required")
    .matches(phoneRegExp, "Phone Number is not a valid 10 digit number")
    .min(10, "Phone Number is too short")
    .max(10, "Phone Number is too long"),
  addressLine: Yup.string().required("Door No. & Street is required!"),
  city: Yup.string().required("City is required!"),
  state: Yup.string().required("State is required!"),
  code: Yup.string().required("ZIP/Postal code is required!"),
  country: Yup.string().required("Country is required!")
});

const LoginStep = () => {
  const history = useHistory();
  const { user } = useContext(AuthStateContext);
  const authDispatch = useContext(AuthDispatchContext);
  const checkoutDispatch = useContext(CheckoutDispatchContext);
  const handleContinueShopping = () => {
    history.push("/");
  };
  const handleLoginAsDiffUser = () => {
    signOut(authDispatch);
    history.push("/auth");
  };
  const handleGotoLogin = () => {
    history.push("/auth");
  };
  const handleProceed = () => {
    setCheckoutStep(checkoutDispatch, CHECKOUT_STEPS.SHIPPING);
  };
  return (
    <div className="detail-container">
      <h2>Sign In now!</h2>
      <div className="auth-message">
        {user ? (
          <>
            <p>
              Logged in as <span>{user?.context?.userDetails?.name}</span>
            </p>
            <button onClick={() => handleLoginAsDiffUser()}>
              Login as Different User
            </button>
          </>
        ) : (
          <>
            <p>Please login to continue.</p>
            <button onClick={() => handleGotoLogin()}>Login</button>
          </>
        )}
      </div>
      <div className="actions">
        <button className="outline" onClick={() => handleContinueShopping()}>
          <i className="rsc-icon-arrow_back" /> Continue Shopping
        </button>
        <button disabled={!user} onClick={() => handleProceed()}>
          Proceed
          <i className="rsc-icon-arrow_forward" />
        </button>
      </div>
    </div>
  );
};

const AddressStep = () => {
  const checkoutDispatch = useContext(CheckoutDispatchContext);

  const handleBackToLogin = () => {
    setCheckoutStep(checkoutDispatch, CHECKOUT_STEPS.AUTH);
  };
  const handleSaveAddress = (addressData) => {
    saveShippingAddress(checkoutDispatch, addressData);
  };
  return (
    <div className="detail-container">
      <h2>Shipping Address</h2>
      <Formik
        initialValues={{
          fullName: "",
          phoneNumber: "",
          addressLine: "",
          city: "",
          state: "",
          code: "",
          country: ""
        }}
        validationSchema={AddressSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const addressData = { ...values };
            resetForm();
            handleSaveAddress(addressData);
          } catch (err) {
            console.error(err);
          }
        }}
      >
        {() => (
          <Form>
            <div className="field-group">
              <Field
                name="fullName"
                type="text"
                placeholder="Full Name"
                component={Input}
              />
              <Field
                name="phoneNumber"
                type="text"
                placeholder="Phone Number"
                component={Input}
              />
            </div>
            <Field
              name="addressLine"
              type="text"
              placeholder="Door No. & Street"
              component={Input}
            />
            <div className="field-group">
              <Field
                name="city"
                type="text"
                placeholder="City"
                component={Input}
              />
              <Field
                name="state"
                type="text"
                placeholder="State"
                component={Input}
              />
            </div>
            <div className="field-group">
              <Field
                name="code"
                type="text"
                placeholder="ZIP/Postal Code"
                component={Input}
              />
              <Field
                name="country"
                type="text"
                placeholder="Country"
                component={Input}
              />
            </div>
            <div className="actions">
              <button
                type="button"
                className="outline"
                onClick={() => handleBackToLogin()}
              >
                <i className="rsc-icon-arrow_back" /> Login in as Different User
              </button>
              <button type="submit">
                Save Address
                <i className="rsc-icon-arrow_forward" />
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const PaymentStep = () => {
  const { shippingAddress } = useContext(CheckoutStateContext);
  const checkoutDispatch = useContext(CheckoutDispatchContext);
  const dispatch = useContext(CartDispatchContext);
  const authState = useContext(AuthStateContext);
  const { items = [] } = useContext(CartStateContext);
  const [submitOrder] = useMutation(createOrder);
  const [images, setFiles] = useState(null);
  const [remarks, setRemarks] = useState(null);
  const [successScreen, setSuccessScreen] = useState(false);
  const [orderId, setOrderID] = useState(null);
  const handleBackToAddress = () => {
    setCheckoutStep(checkoutDispatch, CHECKOUT_STEPS.SHIPPING);
  };
  const handlePayment = async () => {
    try {
      if (images && remarks) {
        const result = await uploadImages(images);
        const {
          data: { files = [] }
        } = await result.json();
        const values = {
          userId: authState.user.context.userId,
          productIds: items.reduce(
            (acc, val) => `${acc} | ${`${val.id} |`.repeat(val.quantity)} `,
            ""
          ),
          orderStatus: "In Progress",
          orderRemarks: remarks,
          shippingDetails: Object.values(shippingAddress).reduce(
            (acc, val) => `${acc} | ${val}`,
            ""
          ),
          initialPayment: "0",
          uploadedPhotos: files.join(",")
        };
        const orderResult = await submitOrder({ variables: values });
        clearCart(dispatch);
        setSuccessScreen(true);
        setOrderID(orderResult?.data?.createOrder?.id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  if (successScreen) {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        {" "}
        <img width="100" src="/checkmark.png" alt="user" title="edit profile" />
        <div> Your oder Successfully placed</div>
        <div>orderId: {orderId}</div>
      </div>
    );
  }
  return (
    <div className="detail-container">
      <h2>Payment</h2>

      <Formik initialValues={{}} validationSchema={AddressSchema}>
        {() => (
          <Form>
            <Field
              name="categoryImage"
              type="file"
              placeholder="Category Image"
              component={Input}
              value={undefined}
              accept="image/png, image/gif, image/jpeg"
              onChange={(event) => {
                setFiles(event.currentTarget.files);
              }}
            />
            <Field
              name="remarks"
              type="text"
              placeholder="Remarks"
              component={Input}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </Form>
        )}
      </Formik>
      <div className="actions">
        <button
          type="button"
          className="outline"
          onClick={() => handleBackToAddress()}
        >
          <i className="rsc-icon-arrow_back" /> Back to Shipping Details
        </button>
        <button disabled={!shippingAddress} onClick={() => handlePayment()}>
          Proceed to order
          <i className="rsc-icon-arrow_forward" />
        </button>
      </div>
    </div>
  );
};

const Checkout = () => {
  const authState = useContext(AuthStateContext);
  const { items = [] } = useContext(CartStateContext);
  const { step, shippingAddress } = useContext(CheckoutStateContext);
  const checkoutDispatch = useContext(CheckoutDispatchContext);
  const totalItems = items.length;

  const handleClickTimeline = (nextStep) => {
    setCheckoutStep(checkoutDispatch, nextStep);
  };
  const cartTotal = items
    .map(
      (item) =>
        (authState.hasPermissions([
          Permissions.RESELLER,
          Permissions.SHOPKEEPER
        ])
          ? item.wholeSalePrice
          : item.price) * item.quantity
    )
    .reduce((prev, current) => prev + current, 0);

  const shippingTotal = items
    .map((item) => Number(item.shippingCharges))
    .reduce((prev, current) => prev + current, 0);
  const localShippingTotal = items
    .map((item) => Number(item.localShippingCharges))
    .reduce((prev, current) => prev + current, 0);
  return (
    <div className="checkout-page">
      <div className="container1">
        <div className="order-details">
          <ul className="timeline">
            <li
              className={classNames({
                done: !!authState.user,
                active: step === CHECKOUT_STEPS.AUTH
              })}
              onClick={() => handleClickTimeline(CHECKOUT_STEPS.AUTH)}
            >
              <h2>Sign In</h2>
              <i className="rsc-icon-check_circle" />
            </li>
            <li
              className={classNames({
                done: shippingAddress !== null,
                active: step === CHECKOUT_STEPS.SHIPPING
              })}
              onClick={() => handleClickTimeline(CHECKOUT_STEPS.SHIPPING)}
            >
              <h2>Shipping</h2>
              <i className="rsc-icon-check_circle" />
            </li>
            <li
              className={classNames({
                done: false,
                active: step === CHECKOUT_STEPS.PAYMENT
              })}
              onClick={() => handleClickTimeline(CHECKOUT_STEPS.PAYMENT)}
            >
              <h2>Payment</h2>
              <i className="rsc-icon-check_circle" />
            </li>
          </ul>
          {step === CHECKOUT_STEPS.AUTH && <LoginStep />}
          {step === CHECKOUT_STEPS.SHIPPING && <AddressStep />}
          {step === CHECKOUT_STEPS.PAYMENT && <PaymentStep />}
        </div>
        <div className="order-summary">
          <h2>
            Summary
            <span>{` (${totalItems}) Items`}</span>
          </h2>
          <ul className="cart-items">
            {items.map((product) => {
              return (
                <li className="cart-item" key={product.name}>
                  <img
                    className="product-image"
                    src={`${imagesUrl}/${product?.images[0]}`}
                  />
                  <div className="product-info">
                    <p className="product-name">{product.name}</p>
                    <p className="product-price">
                      {authState.hasPermissions([
                        Permissions.RESELLER,
                        Permissions.SHOPKEEPER
                      ])
                        ? product.wholeSalePrice
                        : product.price}
                    </p>
                  </div>
                  <div className="product-total">
                    <p className="quantity">
                      {`${product.quantity} ${
                        product.quantity > 1 ? "Nos." : "No."
                      }`}
                    </p>
                    <p className="amount">
                      {product.quantity *
                        (authState.hasPermissions([
                          Permissions.RESELLER,
                          Permissions.SHOPKEEPER
                        ])
                          ? product.wholeSalePrice
                          : product.price)}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>

          <ul className="total-breakup">
            <li>
              <p>Subtotal</p>
              <p>{cartTotal}</p>
            </li>
            <li>
              <p>Shipping Total</p>
              <p>{shippingTotal}</p>
            </li>
            <li>
              <h2>Total</h2>
              <h2>{cartTotal + shippingTotal}</h2>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
