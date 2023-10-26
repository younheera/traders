/**
 * @author wheesunglee
 * @create date 2023-10-25 13:40:37
 * @modify date 2023-10-25 14:16:06
 */

import React from "react";
import { Redirect, Route } from "react-router-dom";
import isLogin from "../../assets/js/isLogin";

const PrivateRoute = ({ component: Component, ...rest }) => {
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        isLogin() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
