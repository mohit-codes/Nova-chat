import socketio from "socket.io-client";
import { BASE_URL } from "../utils/utils";
import React from "react";

export const socket = socketio(BASE_URL);
export const SocketContext = React.createContext();
