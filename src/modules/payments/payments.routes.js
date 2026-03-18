const express = require("express");
const router = express.Router();
const paymentsController = require("./payments.controller");

// Webhook endpoint for payment provider to call
router.post("/webhook", paymentsController.handleWebhook);

module.exports = router;
