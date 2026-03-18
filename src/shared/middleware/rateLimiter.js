/* Rate limiter middleware to protect against API abuse. */

const rateLimit = require("express-rate-limit");

// General API rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: "Too many requests, please try again later.",
});

// Other rate limiters can be defined here for specific routes (e.g., login, registration)

module.exports = { apiLimiter };