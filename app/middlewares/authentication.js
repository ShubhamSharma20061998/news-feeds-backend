// Load environment variables from a .env file
require("dotenv").config();

// Import necessary modules
const jwt = require("jsonwebtoken");
const _ = require("lodash");

/**
 * Middleware to authenticate user based on JWT token
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Callback function to proceed to the next middleware
 */
const authenticateUser = (req, res, next) => {
  let token = req.headers["authorization"];
  if (!token) {
    // If no token provided, return unauthorized status
    return res.status(401).json({ errors: "authentication failed" });
  }
  token = token.split(" ")[1];
  try {
    // Verify the token using the secret key
    const tokenData = jwt.verify(token, process.env.SECRET_KEY);
    // Extract relevant user information (id and role) from the token
    req.user = _.pick(tokenData, ["id", "role"]);
    next();
  } catch (err) {
    // If token verification fails, return unauthorized status
    res.status(401).json({ errors: "authentication failed" });
  }
};

/**
 * Middleware for role-based authorization
 * @param {Array} roles - Array of allowed roles
 * @returns {Function} - Middleware function
 */
const authorization = roles => {
  return function (req, res, next) {
    if (roles.includes(req.user.role)) {
      // If user role is allowed, proceed to the next middleware
      next();
    } else {
      // If user role is not allowed, return forbidden status
      res.status(403).json({ errors: "access restricted" });
    }
  };
};

// Export the middleware functions
module.exports = { authenticateUser, authorization };
