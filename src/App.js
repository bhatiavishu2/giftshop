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
import EditProfilePage from "pages/editProfile";
import CategoryPage from "pages/createCategory";
import ContactUsPage from "pages/contactUs";
import AboutUsPage from "pages/aboutUs";
import SubCategoryPage from "pages/createSubCategory";
import PermissionPage from "pages/permissions";
import CreatePermissionPage from "pages/createPermission";
import EditPermissionPage from "pages/editPermission";
import CreateRolePage from "pages/createRole";
import EditRolePage from "pages/editRole";
import RolePage from "pages/roles";
import EditCategoryPage from "pages/editcategory";
import CreateBannerPage from "pages/createBanner";
import CreateAboutUsPage from "pages/createAboutUs";
import CreateContactUsPage from "pages/createContactUs";
import EditProductPage from "pages/editproduct";
import UserRolePage from "pages/userRoles";
import CreateUserRolePage from "pages/createUserRole";
import { endpoint } from "./constants";
import "assets/scss/style.scss";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-confirm-alert/src/react-confirm-alert.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
  concat
} from "@apollo/client";
import { Permissions } from "./constants/common";
import { onError } from "@apollo/client/link/error";

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: JSON.parse(localStorage.getItem("token")) || null
    }
  }));

  return forward(operation);
});

const httpLink = new HttpLink({ uri: endpoint });
const logoutLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors?.length && graphQLErrors[0].message === "Unauthorized") {
    window.location.href = "/auth";
    localStorage.clear();
  }
});
const formatDateLink = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    return response;
  });
});
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(
    authMiddleware,
    logoutLink.concat(formatDateLink.concat(httpLink))
  )
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
    showNav: false,
    showInDropdown: true,
    isPrivate: true
  },
  {
    id: "createCategory",
    title: "Create Category",
    path: "/createCategory",
    component: CategoryPage,
    layout: CommonLayout,
    permissions: [Permissions.CREATE_CATEGORY],
    showNav: false,
    showInDropdown: true,
    isPrivate: true
  },
  {
    id: "createSubCategory",
    title: "Create Sub Category",
    path: "/createSubCategory",
    component: SubCategoryPage,
    layout: CommonLayout,
    permissions: [Permissions.CREATE_CATEGORY],
    showNav: false,
    showInDropdown: true,
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
    isPrivate: true,
    permissions: [Permissions.CREATE_CATEGORY]
  },
  {
    id: "editProduct",
    path: "/editProduct/:id",
    component: EditProductPage,
    layout: CommonLayout,
    showNav: false,
    isPrivate: true,
    permissions: [Permissions.CREATE_PRODUCT]
  },
  {
    id: "createRole",
    title: "Create Role",
    path: "/createRole",
    component: CreateRolePage,
    layout: CommonLayout,
    showNav: false,
    isPrivate: true,
    permissions: [Permissions.CREATE_ROLE]
  },
  {
    id: "roles",
    title: "Roles",
    path: "/roles",
    component: RolePage,
    layout: CommonLayout,
    showNav: false,
    showInDropdown: true,
    isPrivate: true,
    permissions: [Permissions.CREATE_ROLE]
  },
  {
    id: "editRole",
    path: "/editRole/:id",
    component: EditRolePage,
    layout: CommonLayout,
    showNav: false,
    isPrivate: true,
    permissions: [Permissions.CREATE_ROLE]
  },
  {
    id: "permissions",
    title: "Permissions",
    path: "/permissions",
    component: PermissionPage,
    layout: CommonLayout,
    showNav: false,
    showInDropdown: true,
    isPrivate: true,
    permissions: [Permissions.CREATE_PERMISSION]
  },
  {
    id: "createBanner",
    title: "Create Banner",
    path: "/createBanner",
    component: CreateBannerPage,
    layout: CommonLayout,
    showNav: false,
    showInDropdown: true,
    isPrivate: true,
    permissions: [Permissions.CREATE_BANNER]
  },
  {
    id: "createPermission",
    title: "Create Permission",
    path: "/createPermission",
    component: CreatePermissionPage,
    layout: CommonLayout,
    permissions: [Permissions.CREATE_PERMISSION],
    showNav: false,
    isPrivate: true
  },
  {
    id: "editPermission",
    path: "/editPermission/:id",
    component: EditPermissionPage,
    permissions: [Permissions.CREATE_PERMISSION],
    layout: CommonLayout,
    showNav: false,
    isPrivate: true
  },
  {
    id: "userRoles",
    title: "User Roles",
    path: "/userRoles",
    component: UserRolePage,
    layout: CommonLayout,
    showNav: false,
    showInDropdown: true,
    isPrivate: true,
    permissions: [Permissions.CREATE_USER_ROLE]
  },
  {
    id: "createUserRole",
    title: "Create User Role",
    path: "/createUserRole",
    component: CreateUserRolePage,
    layout: CommonLayout,
    showNav: false,
    isPrivate: true,
    permissions: [Permissions.CREATE_USER_ROLE]
  },
  {
    id: "createUserRole",
    title: "Create User Role",
    path: "/editUserRole/:id",
    component: CreateUserRolePage,
    layout: CommonLayout,
    showNav: false,
    isPrivate: true,
    permissions: [Permissions.CREATE_USER_ROLE]
  },
  {
    id: "createAboutUs",
    title: "Create About Us",
    path: "/createAboutUs",
    component: CreateAboutUsPage,
    layout: CommonLayout,
    showNav: false,
    isPrivate: true,
    showInDropdown: true,
    permissions: [Permissions.CREATE_ABOUT_US]
  },
  {
    id: "createContactUs",
    title: "Create Contact Us",
    path: "/createContactUS",
    component: CreateContactUsPage,
    showInDropdown: true,
    layout: CommonLayout,
    showNav: false,
    isPrivate: true,
    permissions: [Permissions.CREATE_CONTACT_US]
  },
  {
    id: "contactUs",
    title: "Contact Us",
    path: "/contactUS",
    component: ContactUsPage,
    layout: CommonLayout,
    showNav: true,
    isPrivate: false
  },
  {
    id: "aboutUs",
    title: "About Us",
    path: "/aboutUS",
    component: AboutUsPage,
    layout: CommonLayout,
    showNav: true,
    isPrivate: false
  },
  {
    id: "editProfile",
    title: "Edit Profile",
    path: "/editProfile",
    component: EditProfilePage,
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
