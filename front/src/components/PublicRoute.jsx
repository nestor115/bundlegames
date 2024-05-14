import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/Auth";

const PublicRoute = ({ element, ...rest }) => {
  const { user } = useAuth({
    middleware: "guest",
    redirectIfAuthenticated: "/",
  });

  return user ? <Navigate to="/boardgames" replace /> : <Outlet />;
};

export default PublicRoute;
