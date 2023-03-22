import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import React from "react";

const ProtectedRoute = ({ children }) => {
  const token = useSelector((state) => state.auth.token);
  if (!token) {
    return <Navigate to="/home" />;
  }
  return children;
};

export default ProtectedRoute;
