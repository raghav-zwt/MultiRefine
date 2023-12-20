// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const useAuth = () => {
  const result = localStorage.getItem('auth');
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
