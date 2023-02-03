import React from "react";
import { Navigate, Outlet } from "react-router-dom";
// import { auth } from "../firebase.config";
import useAuth from "../hooks/useAuth";



const ProtectedRoute = () => {
  const { currentUser } = useAuth();
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
