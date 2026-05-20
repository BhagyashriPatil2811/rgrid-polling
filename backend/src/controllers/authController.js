/**
 * authController.js
 * Handles admin login.
 * Validates credentials from .env and returns a signed JWT token.
 */

const jwt = require("jsonwebtoken");

/**
 * POST /api/auth/login
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  }

  // Compare against admin credentials stored in .env
  if (
    username !== process.env.ADMIN_USERNAME ||
    password !== process.env.ADMIN_PASSWORD
  ) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  // Sign JWT with admin role
  const token = jwt.sign(
    { username, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return res.status(200).json({
    message: "Login successful.",
    token,
    user: { username, role: "admin" },
  });
};

module.exports = { login };