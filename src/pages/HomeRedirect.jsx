import { Navigate } from "react-router-dom";
import AuthService from "../services/AuthService";

export default function HomeRedirect() {
  const user = AuthService.getCurrentUser();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
}
