import { Navigate, useLocation } from "react-router-dom";
import Unauthorized from "../pages/Unauthorized/Unauthorized";

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const location = useLocation(); // Para alam natin kung saan sila nanggaling

  if (!token) {
    return <Navigate to="/Login" state={{ from: location }} replace />;
  }

  if (allowedRole && role !== allowedRole) {
    return <Unauthorized />;
  }

  return children;
};
export default ProtectedRoute;
