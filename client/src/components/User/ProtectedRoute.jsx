import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContent } from "../../context/AppContext";

const ProtectedRoute = ({ element: Component }) => {
  const { userData, isLoggedin } = useContext(AppContent);

  // Handle initial loading state when userData is null and isLoggedin is false
  if (userData === null && !isLoggedin) {
    return <div>Loading...</div>; // Or replace with a spinner component
  }

  // Redirect if user is not logged in or not an admin
  if (!isLoggedin || !userData?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Render the protected component
  return Component;
};

export default ProtectedRoute;