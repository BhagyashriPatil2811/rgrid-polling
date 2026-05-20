/**
 * api.js
 * Centralized Axios instance for all backend API calls.
 * Automatically attaches JWT token and session ID to every request.
 */

import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// Generate a unique session ID for this browser session
// Used to track if this user has already voted
const getSessionId = () => {
  let sessionId = sessionStorage.getItem("sessionId");
  if (!sessionId) {
    sessionId = uuidv4();
    sessionStorage.setItem("sessionId", sessionId);
  }
  return sessionId;
};

// Create axios instance with base URL from .env
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Attach token and session ID to every request automatically
api.interceptors.request.use((config) => {
  const token = sessionStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  config.headers["x-session-id"] = getSessionId();
  return config;
});

// ── Poll API Calls ─────────────────────────────────────────────────────────────

/** Fetch all nominees and current session vote status */
export const fetchNominees = () => api.get("/api/poll/nominees");

/** Cast a vote for a nominee */
export const castVote = (nomineeId) =>
  api.post("/api/poll/vote", { nomineeId });

/** Fetch poll results — admin only */
export const fetchResults = () => api.get("/api/poll/results");

// ── Auth API Calls ─────────────────────────────────────────────────────────────

/** Login as admin */
export const loginAdmin = (username, password) =>
  api.post("/api/auth/login", { username, password });

export default api;