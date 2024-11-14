import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface PrivateRouteProps {
  element: React.ReactElement;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated);

  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

export default PrivateRoute;
