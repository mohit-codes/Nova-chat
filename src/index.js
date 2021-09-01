import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { SocketContext, socket } from "./context/socket";
import { AuthProvider } from "./context/authProvider";
ReactDOM.render(
  <React.StrictMode>
    <SocketContext.Provider value={socket}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </SocketContext.Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
