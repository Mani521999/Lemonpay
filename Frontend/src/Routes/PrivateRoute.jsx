import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../Axios";

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/signup" />
};

export default PrivateRoute;
