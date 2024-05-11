import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/Auth"; // Asegúrate de que la ruta al archivo sea correcta

const PublicRoute = ({ element, ...rest }) => {
  const { user } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/"
  });

  return user ?  <Navigate to="/boardgames" replace />: <Outlet />;
};

export default PublicRoute;
