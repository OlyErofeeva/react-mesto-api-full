import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoute({ path, exact, component: Component, ...props }) {
  return (
    <Route path={path} exact={exact}>
      {() =>
        props.loggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="./sign-up" />
        )
      }
    </Route>
  );
}

export default ProtectedRoute;
