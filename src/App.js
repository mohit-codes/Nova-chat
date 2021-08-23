import React from "react";
import { Router } from "@reach/router";
import { Home, Login, Signup } from "./pages/index";
function App() {
  return (
    <div className="App">
      <Router>
        <Login path="/" />
        <Home path="home" />
        <Signup path="signup" />
      </Router>
    </div>
  );
}

export default App;
