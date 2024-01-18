import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isAdminRoute = false }) => {
  const token = localStorage.getItem('token');
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  if (!token || (isAdminRoute && !isAdmin)) {
    return <Navigate to="/" />;
  }

  return children;
};
export default ProtectedRoute;