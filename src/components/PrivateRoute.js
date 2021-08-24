import { Navigate, Route } from "react-router-dom";
import { useAuth } from "../Context/AuthProvider";

export function PrivateRoute({ path, ...props }) {
  const { user } = useAuth();
  return user !== null ? (
    <Route {...props} path={path} />
  ) : (
    <Navigate state={{ from: path }} replace to="/login" />
  );
}
