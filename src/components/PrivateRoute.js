import { useNavigate } from "@reach/router";
import { useEffect } from "react";
import { useAuth } from "../context/authProvider";
import { Home } from "../pages";

export function PrivateRoute() {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (user == null) {
      navigate("/", { replace: true });
    }
  }, []);
  return <Home />;
}
