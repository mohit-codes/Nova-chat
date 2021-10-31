import React from "react";
import { Router } from "@reach/router";
import { Login, Signup, Home } from "./pages/index";
import { PrivateRoute } from "./components/PrivateRoute";
function App() {
  return (
    <div className="App">
      <Router>
        <Login path="/" />
        <PrivateRoute component={Home} path="home" />
        <Signup path="signup" />
      </Router>
    </div>
  );
}

export default App;
