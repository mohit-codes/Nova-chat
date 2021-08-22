import React from "react";
import { Router } from "@reach/router";
import { Home, Login } from "./pages/index";
function App() {
  return (
    <div className="App">
      <Router>
        <Login path="/" />
        <Home path="home" />
      </Router>
    </div>
  );
}

export default App;
