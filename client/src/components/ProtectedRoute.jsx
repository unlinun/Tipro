import { Navigate } from "react-router-dom";

import React from "react";

const ProtectedRoute = ({ children, token }) => {
  console.log(token);
  if (!token) {
    return <Navigate to="/home/login" />;
  }
  return children;
};

export default ProtectedRoute;
