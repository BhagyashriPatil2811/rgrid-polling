/**
 * VoteCard.jsx
 * Displays a single nominee card with a vote button.
 * Disables vote button if user has already voted.
 */

import React from "react";
import "./VoteCard.css";

const VoteCard = ({ nominee, hasVoted, onVote, isVoting }) => {
  return (
    <div className={`vote-card ${hasVoted ? "voted" : ""}`}>
      <div className="vote-card-symbol">{nominee.symbol}</div>
      <div className="vote-card-info">
        <h3 className="vote-card-name">{nominee.name}</h3>
        <p className="vote-card-party">{nominee.party}</p>
      </div>
      <button
        className="btn-vote"
        onClick={() => onVote(nominee.id)}
        disabled={hasVoted || isVoting}
      >
        {hasVoted ? "✅ Voted" : isVoting ? "Submitting..." : "Vote"}
      </button>
    </div>
  );
};

export default VoteCard;