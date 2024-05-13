import React from "react";
import { Route, Routes } from "react-router";
import PublicRoute from "./PublicRoutes";
import { Login } from "../../pages/Login";
import PrivateRoute from "./PrivateRoutes";
import { Home } from "../../pages/Home";

export const Layout = () => {
  return (
    <Routes>
      <Route
        path="/read-pdf-by-page/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        index
        path="/read-pdf-by-page"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
