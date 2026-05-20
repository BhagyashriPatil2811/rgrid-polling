/**
 * pollRoutes.js
 * Routes for poll operations
 * Public: nominees, vote
 * Protected: results (admin only)
 */

const express = require("express");
const router = express.Router();
const { getNominees, castVote, getResults } = require("../controllers/pollController");
const { verifyToken } = require("../middleware/authMiddleware");

// GET /api/poll/nominees — public
router.get("/nominees", getNominees);

// POST /api/poll/vote — public, session-controlled
router.post("/vote", castVote);

// GET /api/poll/results — protected, admin only
router.get("/results", verifyToken, getResults);

module.exports = router;