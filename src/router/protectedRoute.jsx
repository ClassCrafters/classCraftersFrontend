import {Navigate} from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";


export default function ProtectedRoute({ children, allowedRoles }) {
  const role = useSelector((state) => state.auth.role);
  console.log("ProtectedRoute - User role:", role);

  // Not logged in
  if (!role) return <Navigate to="/login/auth" />;

  // Role not allowed
  if (!allowedRoles.includes(role)) {
    return <h1>Access Denied</h1>;
  }

  return children;
}