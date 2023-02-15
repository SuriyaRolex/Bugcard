import React from "react";
import { Navigate } from "react-router-dom";
import { AppRoutes } from "./routes";
import { Access } from "./access";
import { LocalStorageKeys } from "../utils";

const PrivateRoute = ({ path, children, ...rest }) => {

  const isAuthenticated = (path) => {
    if (localStorage.getItem(LocalStorageKeys.authToken)) {
      const _ = Access("role", path);
      if (_ >= 0) {
        return true;
      };
      return false;
    } else {
      return false;
    }
  };

  return (
    <>
      {
        isAuthenticated(path) ? children : (
          <Navigate
            to={AppRoutes.login}
            state={{ from: path }}
          />
        )
      }
    </>
  );
};

export default PrivateRoute;
