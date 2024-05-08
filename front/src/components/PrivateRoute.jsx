import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/Auth"; // Asegúrate de que la ruta al archivo sea correcta

const PrivateRoute = ({ element, ...rest }) => {
  const { user } = useAuth({
    middleware: "guest"
  });

  return user ? (
    <Outlet/>
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateRoute;