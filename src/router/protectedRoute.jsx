import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ProtectedRoute({ allowedRoles }) {
  const role = useSelector((state) => state.auth.role);
  console.log("User role in ProtectedRoute:", role);

  // Not logged in
  if (!role) return <Navigate to="/login/auth" replace />;

  // Role not allowed
  if (!allowedRoles.includes(role)) {
    return <h1>Access Denied</h1>;
  }

  // Allow route rendering
  return <Outlet />;
}
