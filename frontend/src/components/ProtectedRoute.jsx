import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useContext(ShopContext);

  // User not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Role check
  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;