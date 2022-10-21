import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import AuthProvider from "contexts/auth";
import CommonProvider from "contexts/common";
import ProductsProvider from "contexts/products";
import CartProvider from "contexts/cart";
import CheckoutProvider from "contexts/checkout";
import RouteWrapper from "layouts/RouteWrapper";
import AuthLayout from "layouts/AuthLayout";
import CommonLayout from "layouts/CommonLayout";
import AuthPage from "pages/auth";
import HomePage from "pages/home";
import ProductPage from "pages/products";
import RegisterPage from "pages/register";
import CheckoutPage from "pages/checkout";
import CreateProductPage from "pages/createproduct";
import CategoryPage from "pages/createCategory";
import SubCategoryPage from "pages/createSubCategory";
import { endpoint } from "./constants";
import "assets/scss/style.scss";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: endpoint
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <CommonProvider>
          <ProductsProvider>
            <CartProvider>
              <CheckoutProvider>
                <Router>
                  <Switch>
                    <RouteWrapper
                      path="/"
                      exact
                      component={HomePage}
                      layout={CommonLayout}
                    />
                    <RouteWrapper
                      path="/checkout"
                      component={CheckoutPage}
                      layout={CommonLayout}
                    />
                    <RouteWrapper
                      path="/auth"
                      component={AuthPage}
                      layout={AuthLayout}
                    />
                    <RouteWrapper
                      path="/register"
                      component={RegisterPage}
                      layout={AuthLayout}
                    />
                    <RouteWrapper
                      path="/createProduct"
                      component={CreateProductPage}
                      layout={AuthLayout}
                    />
                    <RouteWrapper
                      path="/createCategory"
                      component={CategoryPage}
                      layout={AuthLayout}
                    />
                    <RouteWrapper
                      path="/createSubCategory"
                      component={SubCategoryPage}
                      layout={AuthLayout}
                    />
                    <RouteWrapper
                      path="/products/:categoryId"
                      component={ProductPage}
                      layout={CommonLayout}
                    />
                  </Switch>
                </Router>
              </CheckoutProvider>
            </CartProvider>
          </ProductsProvider>
        </CommonProvider>
      </AuthProvider>
    </ApolloProvider>
  );
};

export default App;
