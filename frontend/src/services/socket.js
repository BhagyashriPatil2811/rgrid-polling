/**
 * socket.js
 * Socket.io client instance.
 * Single shared connection used across the app.
 */

import { io } from "socket.io-client";

// Connect to backend socket server
const socket = io(process.env.REACT_APP_SOCKET_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

export default socket;