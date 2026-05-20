/**
 * VotePage.jsx
 * Public voting page.
 * Loads nominees, tracks session vote status, handles vote submission.
 */

import React, { useEffect, useState } from "react";
import VoteCard from "../components/VoteCard";
import { fetchNominees, castVote } from "../services/api";
import "./VotePage.css";

const VotePage = () => {
  const [nominees, setNominees] = useState([]);
  const [hasVoted, setHasVoted] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load nominees on component mount
  useEffect(() => {
    const loadNominees = async () => {
      try {
        const response = await fetchNominees();
        setNominees(response.data.nominees);
        setHasVoted(response.data.hasVoted);
      } catch {
        setError("Failed to load nominees. Please refresh.");
      } finally {
        setLoading(false);
      }
    };

    loadNominees();
  }, []);

  /**
   * Handle vote submission for a nominee
   * @param {string} nomineeId
   */
  const handleVote = async (nomineeId) => {
    setIsVoting(true);
    setMessage("");

    try {
      const response = await castVote(nomineeId);
      setHasVoted(true);
      setMessage(response.data.message);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Failed to cast vote. Try again."
      );
    } finally {
      setIsVoting(false);
    }
  };

  if (loading) return <div className="page-status">Loading nominees...</div>;
  if (error) return <div className="page-status error">{error}</div>;

  return (
    <div className="vote-page">
      <div className="container">
        <div className="vote-header">
          <h1>🗳️ Cast Your Vote</h1>
          <p>Select your preferred candidate. You can only vote once.</p>
        </div>

        {hasVoted && (
          <div className="vote-success-banner">
            ✅ Thank you! Your vote has been recorded successfully.
          </div>
        )}

        {message && !hasVoted && (
          <div className="vote-error-banner">{message}</div>
        )}

        <div className="nominees-list">
          {nominees.map((nominee) => (
            <VoteCard
              key={nominee.id}
              nominee={nominee}
              hasVoted={hasVoted}
              onVote={handleVote}
              isVoting={isVoting}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VotePage;