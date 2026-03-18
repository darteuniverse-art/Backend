const express = require("express");
const notificationsController = require("./notifications.controller");
const authMiddleware = require("../../shared/middleware/auth");

const router = express.Router();

router.get("/", authMiddleware.requireAuth, notificationsController.getNotifications);
router.put("/", authMiddleware.requireAuth, notificationsController.markAsRead);

module.exports = router;
