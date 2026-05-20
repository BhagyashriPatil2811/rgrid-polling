/**
 * pollController.js
 * Handles all poll-related operations:
 * - Fetching nominees
 * - Casting votes
 * - Fetching results (admin only)
 */

const pollStore = require("../store/pollStore");

/**
 * GET /api/poll/nominees
 * Public — returns nominees + voting status for current session
 */
const getNominees = (req, res) => {
  const sessionId = req.headers["x-session-id"];
  const { nominees, votes, totalVotes } = pollStore.getResults();

  return res.status(200).json({
    nominees,
    votes,
    totalVotes,
    hasVoted: sessionId ? pollStore.hasVoted(sessionId) : false,
  });
};

/**
 * POST /api/poll/vote
 * Public — session-controlled to allow only one vote per user
 * Requires header: x-session-id
 */
const castVote = (req, res) => {
  const { nomineeId } = req.body;
  const sessionId = req.headers["x-session-id"];

  if (!sessionId) {
    return res.status(400).json({ message: "Session ID is required." });
  }

  if (!nomineeId) {
    return res.status(400).json({ message: "Nominee ID is required." });
  }

  const result = pollStore.castVote(nomineeId, sessionId);

  if (!result.success) {
    return res.status(400).json({ message: result.message });
  }

  // Emit real-time update to admin dashboard via socket
  const io = req.app.get("io");
  io.to("admin-room").emit("vote-updated", pollStore.getResults());

  return res.status(200).json({
    message: result.message,
    results: pollStore.getResults(),
  });
};

/**
 * GET /api/poll/results
 * Protected — admin only, requires valid JWT
 */
const getResults = (req, res) => {
  return res.status(200).json(pollStore.getResults());
};

module.exports = { getNominees, castVote, getResults };