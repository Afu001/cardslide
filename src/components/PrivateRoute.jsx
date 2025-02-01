import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = () => {
  const { currentUser } = useAuth();

  // If user is authenticated, render the child routes
  // Otherwise, redirect to the login page
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;