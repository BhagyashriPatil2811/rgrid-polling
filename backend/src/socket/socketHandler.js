/**
 * socketHandler.js
 * Manages all Socket.io real-time events.
 * Admin joins a dedicated room and receives live vote updates.
 */

const jwt = require("jsonwebtoken");
const pollStore = require("../store/pollStore");

/**
 * Initialize socket event listeners
 * @param {import("socket.io").Server} io
 */
const initializeSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`[Socket] Client connected: ${socket.id}`);

    /**
     * Admin emits "join-admin" with JWT token to enter admin room.
     * Token is verified before joining — unauthorized clients are rejected.
     */
    socket.on("join-admin", (token) => {
      try {
        jwt.verify(token, process.env.JWT_SECRET);
        socket.join("admin-room");
        console.log(`[Socket] Admin joined admin-room: ${socket.id}`);

        // Send current results immediately on join
        socket.emit("vote-updated", pollStore.getResults());
      } catch (error) {
        console.log(`[Socket] Unauthorized join attempt: ${socket.id}`);
        socket.emit("unauthorized", { message: "Invalid token." });
      }
    });

    socket.on("disconnect", () => {
      console.log(`[Socket] Client disconnected: ${socket.id}`);
    });
  });
};

module.exports = { initializeSocket };