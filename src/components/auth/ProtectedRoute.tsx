// src/components/auth/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children?: ReactNode;
  requiredTier?: "builder" | "architect"; // Optional tier gating
}

const ProtectedRoute = ({ children, requiredTier }: ProtectedRouteProps) => {
  const { user, hasAccess } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredTier && !hasAccess(requiredTier)) {
    return <Navigate to="/pricing" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;
