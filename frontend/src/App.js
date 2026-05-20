/**
 * App.js
 * Root component — sets up routing and auth provider.
 */

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import LoginPage from "./pages/LoginPage";
import VotePage from "./pages/VotePage";
import AdminPage from "./pages/AdminPage";
import "./App.css";

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Default route goes to voting page */}
          <Route path="/" element={<Navigate to="/vote" replace />} />

          {/* Public voting page */}
          <Route path="/vote" element={<VotePage />} />

          {/* Admin login page */}
          <Route path="/login" element={<LoginPage />} />

          {/* Protected admin dashboard */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/vote" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;