import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ProtectedRoute = ({ children }) => {

  const { user, authLoading } = useContext(ShopContext);

  // While we're checking localStorage's token against the backend on
  // refresh, don't redirect yet - otherwise every refresh briefly
  // bounces to /auth before the session restore finishes.
  if (authLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;