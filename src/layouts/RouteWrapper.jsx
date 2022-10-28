import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthStateContext } from "contexts/auth";

function RouteWrapper({
  component: Component,
  layout: Layout,
  isPrivate = false,
  permissions,
  ...rest
}) {
  const { user, hasPermissions } = useContext(AuthStateContext);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isPrivate && (!hasPermissions(permissions))) {
          return (
            <Redirect
              to={{
                pathname: "/auth",
                state: { from: props.location }
              }}
            />
          );
        }
        return (
          <Layout {...props}>
            <Component {...props} />
          </Layout>
        );
      }}
    />
  );
}

export default RouteWrapper;
