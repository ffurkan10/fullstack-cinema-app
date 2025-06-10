
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userRole");
  
  if (token && role === "admin") {
    return <>{children}</>;
  }

  return <Navigate to={"/giris-yap"} />;
};

export default PrivateRoute;