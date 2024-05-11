import React from "react";
import { Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/Auth"; // Asegúrate de que la ruta al archivo sea correcta

const PrivateRoute = ({ element, ...rest }) => {
  const { user } = useAuth({
    middleware: "auth",
  });
  const location = useLocation();
  return user ? <Outlet /> : <Navigate to={location.pathname} replace />;
};

export default PrivateRoute;
