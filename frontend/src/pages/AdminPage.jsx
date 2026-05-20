/**
 * AdminPage.jsx
 * Admin dashboard — shows live vote counts and chart.
 * Connects to socket room on mount to receive real-time updates.
 */

import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import socket from "../services/socket";
import ResultChart from "../components/ResultChart";
import "./AdminPage.css";

const AdminPage = () => {
  const { token } = useAuth();
  const [results, setResults] = useState(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // Join admin socket room with JWT token for verification
    socket.emit("join-admin", token);

    // Listen for real-time vote updates from backend
    socket.on("vote-updated", (data) => {
      setResults(data);
      setConnected(true);
    });

    // Handle unauthorized socket connection
    socket.on("unauthorized", () => {
      setConnected(false);
    });

    // Cleanup listeners on unmount
    return () => {
      socket.off("vote-updated");
      socket.off("unauthorized");
    };
  }, [token]);

  if (!results) {
    return (
      <div className="page-status">Connecting to live poll data...</div>
    );
  }

  const { nominees, votes, totalVotes } = results;

  return (
    <div className="admin-page">
      <div className="container">

        {/* Header */}
        <div className="admin-header">
          <h1>📊 Admin Dashboard</h1>
          <span className={`live-badge ${connected ? "live" : "offline"}`}>
            {connected ? "🔴 LIVE" : "⚫ Offline"}
          </span>
        </div>

        {/* Total Votes Card */}
        <div className="total-votes-card">
          <p className="total-label">Total Votes</p>
          <p className="total-count">{totalVotes}</p>
        </div>

        {/* Per Nominee Vote Counts */}
        <div className="nominee-stats">
          {nominees.map((nominee) => {
            const voteCount = votes[nominee.id] || 0;
            const percentage =
              totalVotes > 0
                ? ((voteCount / totalVotes) * 100).toFixed(1)
                : 0;

            return (
              <div key={nominee.id} className="nominee-stat-card">
                <div className="nominee-stat-left">
                  <span className="nominee-symbol">{nominee.symbol}</span>
                  <div>
                    <p className="nominee-stat-name">{nominee.name}</p>
                    <p className="nominee-stat-party">{nominee.party}</p>
                  </div>
                </div>
                <div className="nominee-stat-right">
                  <p className="nominee-vote-count">{voteCount}</p>
                  <p className="nominee-percentage">{percentage}%</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Chart */}
        <div className="chart-container">
          <ResultChart nominees={nominees} votes={votes} />
        </div>

      </div>
    </div>
  );
};

export default AdminPage;