import React from "react";
import { Route, Routes } from "react-router";
import PublicRoute from "./PublicRoutes";
import { Login } from "../../pages/Login";
import { Register } from "../../pages/Register";
import PrivateRoute from "./PrivateRoutes";
import { Home } from "../../pages/Home";

export const Layout = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        index
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
    </Routes>
  );
};
