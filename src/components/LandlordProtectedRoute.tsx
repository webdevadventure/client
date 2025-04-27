import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface LandlordProtectedRouteProps {
  children: React.ReactNode;
}

const LandlordProtectedRoute: React.FC<LandlordProtectedRouteProps> = ({
  children,
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        Đang kiểm tra đăng nhập...
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.user_type !== "landlord") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default LandlordProtectedRoute;
