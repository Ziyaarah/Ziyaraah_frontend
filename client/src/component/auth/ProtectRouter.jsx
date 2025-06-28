
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, requireAuth }) => {
  const token = localStorage.getItem("token");


  if (requireAuth && !token) {
    return <Navigate to="/sigin" />;
  }


  if (!requireAuth && token) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
