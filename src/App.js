import React, { Suspense } from "react";
import { Router } from "@reach/router";
import { Login, Signup } from "./pages/index";
import { PrivateRoute } from "./components/PrivateRoute";
import { Spinner } from "./components";

const Home = React.lazy(() => import("./pages/home"));
const RightSection = React.lazy(() => import("./components/Home/RightSection"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={<Spinner />}>
        <Router>
          <Login path="/" />
          <PrivateRoute component={Home} path="home">
            <RightSection path=":recipientId" />
          </PrivateRoute>
          <Signup path="signup" />
        </Router>
      </Suspense>
    </div>
  );
}

export default App;
