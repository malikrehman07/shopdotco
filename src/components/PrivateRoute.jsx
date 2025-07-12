import React from 'react'
import { useAuthContext } from '../context/Auth'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ Component, role }) => {
  const { user, isAuth } = useAuthContext();

  if (!isAuth) {
    return <Navigate to="/auth/login" />;
  }

  if (user?.role !== role) {
    return <Navigate to="/" />;
  }

  return <Component />;
};


export default PrivateRoute
