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
import PermissionPage from "pages/permissions";
import CreatePermissionPage from "pages/createPermission";
import EditPermissionPage from "pages/editPermission";
import RolePage from "pages/roles";
import EditCategoryPage from "pages/editcategory";
import EditProductPage from "pages/editproduct";
import { endpoint } from "./constants";
import "assets/scss/style.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import { Permissions } from "./constants/common";
const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: endpoint
});

export const navConfig = [
  {
    id: "home",
    title: "Home",
    path: "/",
    exact: true,
    component: HomePage,
    layout: CommonLayout,
    showNav: true
  },
  {
    id: "checkout",
    path: "/checkout",
    component: CheckoutPage,
    layout: CommonLayout,
    showNav: false
  },
  {
    id: "auth",
    path: "/auth",
    component: AuthPage,
    layout: AuthLayout,
    showNav: false
  },
  {
    id: "register",
    path: "/register",
    component: RegisterPage,
    layout: AuthLayout,
    showNav: false
  },
  {
    id: "createProduct",
    title: "Create Product",
    path: "/createProduct",
    component: CreateProductPage,
    layout: CommonLayout,
    permissions: [Permissions.CREATE_PRODUCT],
    showNav: true,
    isPrivate: true
  },
  {
    id: "createCategory",
    title: "Create Category",
    path: "/createCategory",
    component: CategoryPage,
    layout: CommonLayout,
    permissions: [Permissions.CREATE_CATEGORY],
    showNav: true,
    isPrivate: true
  },
  {
    id: "createSubCategory",
    title: "Create Sub Category",
    path: "/createSubCategory",
    component: SubCategoryPage,
    layout: CommonLayout,
    permissions: [Permissions.CREATE_CATEGORY],
    showNav: true,
    isPrivate: true
  },
  {
    id: "productByCategory",
    path: "/products/:categoryId",
    component: ProductPage,
    layout: CommonLayout,
    showNav: false
  },
  {
    id: "categoryById",
    path: "/categories/:categoryId",
    component: EditCategoryPage,
    layout: CommonLayout,
    showNav: false,
    isPrivate: true
  },
  {
    id: "editProduct",
    path: "/editProduct/:id",
    component: EditProductPage,
    layout: CommonLayout,
    showNav: false,
    isPrivate: true
  },
  {
    id: "createRole",
    title: "Create Role",
    path: "/createRole",
    component: RolePage,
    layout: CommonLayout,

    showNav: false,
    isPrivate: true
  },
  {
    id: "roles",
    title: "Roles",
    path: "/roles",
    component: RolePage,
    layout: CommonLayout,

    showNav: true,
    isPrivate: true
  },
  {
    id: "permissions",
    title: "Permissions",
    path: "/permissions",
    component: PermissionPage,
    layout: CommonLayout,
    showNav: true,
    isPrivate: true
  },
  {
    id: "createPermission",
    title: "Create Permission",
    path: "/createPermission",
    component: CreatePermissionPage,
    layout: CommonLayout,
    // permissions: [Permissions.CREATE_PERMISSION],
    showNav: false,
    isPrivate: true
  },
  {
    id: "editPermission",
    path: "/editPermission/:id",
    component: EditPermissionPage,
    layout: CommonLayout,
    showNav: false,
    isPrivate: true
  }
];

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
                    {navConfig.map((nav) => (
                      <RouteWrapper
                        key={nav.id}
                        path={nav.path}
                        exact={!!nav.exact}
                        component={nav.component}
                        layout={nav.layout}
                        isPrivate={!!nav.isPrivate}
                        permissions={nav.permissions}
                      />
                    ))}
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
