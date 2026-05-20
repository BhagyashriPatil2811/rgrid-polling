/**
 * server.js
 * Main entry point — sets up Express, Socket.io, middleware and routes.
 */

require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const authRoutes = require("./src/routes/authRoutes");
const pollRoutes = require("./src/routes/pollRoutes");
const { initializeSocket } = require("./src/socket/socketHandler");

const app = express();
const httpServer = http.createServer(app);

// ── Socket.io Setup ────────────────────────────────────────────────────────────
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});

// Make io accessible inside controllers via req.app.get("io")
app.set("io", io);
initializeSocket(io);

// ── Middleware ─────────────────────────────────────────────────────────────────
app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

// ── Routes ─────────────────────────────────────────────────────────────────────
app.use("/api/auth", authRoutes);
app.use("/api/poll", pollRoutes);

// ── Health Check ───────────────────────────────────────────────────────────────
app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", message: "Server is running." });
});

// ── Start Server ───────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () => {
  console.log(`[Server] Running on http://localhost:${PORT}`);
  console.log(`[Server] Admin username: ${process.env.ADMIN_USERNAME}`);
});