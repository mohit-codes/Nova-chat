import { Redirect } from "@reach/router";
import { useAuth } from "../context/authProvider";

export function PrivateRoute({ component: Component, ...rest }) {
  const { user } = useAuth();
  return user == null ? (
    //add noThrow and Redirect will do redirect without using componentDidCatch.
    //Redirect works with componentDidCatch to prevent the tree from rendering and starts over with a new location.
    <Redirect from="" to="/" noThrow />
  ) : (
    <Component {...rest} />
  );
}
