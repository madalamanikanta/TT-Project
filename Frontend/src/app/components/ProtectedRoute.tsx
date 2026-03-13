import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
  /**
   * If set to 'admin', users without the admin role will be redirected to /admin/login.
   */
  requiredRole?: 'admin';
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    const redirectPath = requiredRole === 'admin' ? '/admin/login' : '/login';
    return <Navigate to={redirectPath} replace />;
  }

  if (requiredRole === 'admin') {
    if (role !== 'ADMIN' && role !== 'ROLE_ADMIN') {
      return <Navigate to="/student/dashboard" replace />;
    }
  }

  return <>{children}</>;
}
