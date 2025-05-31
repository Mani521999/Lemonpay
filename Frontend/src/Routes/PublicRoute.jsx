import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../Axios";

const PublicRoute = ({ children }) => {
  return !isAuthenticated() ? children : <Navigate to="/task" />;
};

export default PublicRoute;