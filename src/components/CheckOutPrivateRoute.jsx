import React from "react"
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/Auth";

const CheckOutPrivateRoute = ({ Component }) => {
  const { isAuth } = useAuthContext();

  if (!isAuth) {
    return <Navigate to="/auth/login" />;
  }

  return <Component />;
};

export default CheckOutPrivateRoute