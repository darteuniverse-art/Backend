const express = require("express");
const router = express.Router();
const authMiddleware = require("../../shared/middleware/auth");
const authController = require("./auth.controller");

// Public routes
router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/upload-profile-picture", authMiddleware.requireAuth, authController.uploadProfilePicture); // Should accept form-data with image file
router.post("/forgot-password", authController.forgotPassword); // Should accept email
router.post("/reset-password", authController.resetPassword); // Should accept Otp and new password

// Protected routes (require authentication)
router.get("/me", authMiddleware.requireAuth, authController.getUser); // Get active user
router.post("/logout", authMiddleware.requireAuth, authController.logout);

module.exports = router;

