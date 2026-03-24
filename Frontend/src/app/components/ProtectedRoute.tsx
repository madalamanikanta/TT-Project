import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface ProtectedRouteProps {
  children: ReactNode;
  /**
   * If set to 'admin', users without the admin role will be redirected to /admin/login.
   */
  requiredRole?: 'admin';
}

function isTokenValid(token: string | null): boolean {
  if (!token) return false;
  try {
    const [, payload] = token.split('.');
    if (!payload) return false;
    const decoded = JSON.parse(atob(payload));
    if (!decoded?.exp) return false;
    return Date.now() < decoded.exp * 1000;
  } catch {
    return false;
  }
}

export default function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const token = localStorage.getItem('token');
  const userJson = localStorage.getItem('user');
  const user = userJson ? JSON.parse(userJson) : null;
  const location = useLocation();

  const redirectPath = requiredRole === 'admin' ? '/admin/login' : '/login';

  if (!isTokenValid(token)) {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    return <Navigate to={redirectPath} replace state={{ from: location }} />;
  }

  if (requiredRole === 'admin') {
    const role = (user?.role || '').toString().toLowerCase();
    if (role !== 'admin') {
      return <Navigate to={redirectPath} replace state={{ from: location }} />;
    }
  }

  return <>{children}</>;
}
