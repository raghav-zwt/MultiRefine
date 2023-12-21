// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import axios from "axios";

const useCheck = () => {
  const result = axios.defaults.headers.common["Authorization"];
  return { userId: result }; 
}

const PrivateRoute = ({ children }) => {
  const isAuthenticated = useCheck();

  return isAuthenticated.userId ? (
    children
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
