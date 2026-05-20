/**
 * Navbar.jsx
 * Top navigation bar.
 * Shows logout button when admin is logged in.
 */

import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => navigate("/")}>
        🗳️ <span>RGrid Polling</span>
      </div>
      <div className="navbar-right">
        {isAuthenticated ? (
          <>
            <span className="navbar-user">👤 {user?.username}</span>
            <button className="btn-logout" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <button className="btn-login" onClick={() => navigate("/login")}>
            Admin Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;