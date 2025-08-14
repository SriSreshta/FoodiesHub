// src/components/privateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function PrivateRoute({ children }) {
  const [cookies] = useCookies(["access_token"]);
  const token =
    cookies.access_token ||
    localStorage.getItem("access_token") ||
    localStorage.getItem("token");

  return token ? children : <Navigate to="/" replace />;
}
