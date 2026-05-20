/**
 * pollStore.js
 * In-memory store — acts as the database for this application.
 * All vote data lives here while the server is running.
 * On server restart, votes reset (acceptable for this demo).
 */

const nominees = require("../config/nominees");

/**
 * Initialize vote counts to 0 for all nominees
 * Result: { "1": 0, "2": 0, "3": 0, "4": 0, "5": 0 }
 */
const initializeVotes = () => {
  return nominees.reduce((acc, nominee) => {
    acc[nominee.id] = 0;
    return acc;
  }, {});
};

const pollStore = {
  // All nominees loaded from config (seeder)
  nominees,

  // Vote counts per nominee { nomineeId: count }
  votes: initializeVotes(),

  // Tracks session IDs that have already voted (prevents double voting)
  votedSessions: new Set(),

  /**
   * Cast a vote for a nominee
   * @param {string} nomineeId - ID of the nominee to vote for
   * @param {string} sessionId - Unique session ID of the voter
   * @returns {{ success: boolean, message: string }}
   */
  castVote(nomineeId, sessionId) {
    if (this.votedSessions.has(sessionId)) {
      return { success: false, message: "You have already voted." };
    }

    if (!(nomineeId in this.votes)) {
      return { success: false, message: "Invalid nominee." };
    }

    this.votes[nomineeId]++;
    this.votedSessions.add(sessionId);

    return { success: true, message: "Vote cast successfully." };
  },

  /**
   * Get current poll results
   * @returns {{ nominees: Array, votes: Object, totalVotes: number }}
   */
  getResults() {
    const totalVotes = Object.values(this.votes).reduce(
      (sum, count) => sum + count,
      0
    );
    return {
      nominees: this.nominees,
      votes: this.votes,
      totalVotes,
    };
  },

  /**
   * Check if a session has already voted
   * @param {string} sessionId
   * @returns {boolean}
   */
  hasVoted(sessionId) {
    return this.votedSessions.has(sessionId);
  },
};

module.exports = pollStore;