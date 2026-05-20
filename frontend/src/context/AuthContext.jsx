/**
 * AuthContext.jsx
 * Provides authentication state across the entire app.
 * Stores JWT token and user info in sessionStorage.
 * sessionStorage clears automatically when browser tab is closed.
 */

import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Initialize state from sessionStorage (persists on page refresh)
  const [token, setToken] = useState(
    () => sessionStorage.getItem("token") || null
  );
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  /**
   * Save token and user to state and sessionStorage
   * @param {string} token - JWT token
   * @param {object} user - Admin user object
   */
  const login = (token, user) => {
    setToken(token);
    setUser(user);
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("user", JSON.stringify(user));
  };

  /**
   * Clear token and user from state and sessionStorage
   */
  const logout = () => {
    setToken(null);
    setUser(null);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        isAuthenticated: !!token,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use auth context
 * @returns {{ token, user, isAuthenticated, login, logout }}
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};