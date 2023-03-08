import socketio from "socket.io-client";
import { BASE_URL } from "../utils/utils";
import { create } from "zustand";

export const socket = socketio(BASE_URL);

export const useSocket = create(() => ({
  socket: socket,
}));
