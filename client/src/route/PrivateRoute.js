// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const useAuth = () => {
  const result = localStorage.getItem('userId');
  return { userId: result }; 
}

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useAuth();

  return isAuthenticated.userId ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
