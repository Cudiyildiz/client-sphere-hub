
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children,
  allowedRoles = ['admin', 'staff', 'brand']
}) => {
  const { user, isAuthenticated, loading } = useAuth();
  
  // Show loading state if still checking authentication
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-primary"></div>
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Check if user has the required role
  if (user && !allowedRoles.includes(user.role)) {
    // Redirect based on role
    switch (user.role) {
      case 'admin':
        return <Navigate to="/admin" replace />;
      case 'staff':
        return <Navigate to="/staff" replace />;
      case 'brand':
        return <Navigate to="/brand" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }
  
  // Render the children if authenticated and authorized
  return <>{children}</>;
};

export default ProtectedRoute;
