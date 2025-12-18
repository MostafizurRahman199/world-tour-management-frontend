import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router-dom";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);
    const user = data?.data?.data;
    if (!isLoading && (!user?.email || (requiredRole && user?.role !== requiredRole))) {
      return <Navigate to="/login" />;
    }

    if (requiredRole && user?.role !== requiredRole && !isLoading) {
      return <Navigate to="/unauthorized" />;
    }

    return <Component />;
  };
};
