const express = require("express");
const router = express.Router();
const authMiddleware = require("../../shared/middleware/auth");
const ordersController = require("./orders.controller");

// Protected routes (require authentication)
router.post("/", authMiddleware.requireAuth, ordersController.createOrder); 
/* The above route will create an order, may accept an optional discount code
  and verify the code and also initiate the payment process. */
router.get("/", authMiddleware.requireAuth, ordersController.getOrders); // Fetch all orders for active user
router.get("/:id", authMiddleware.requireAuth, ordersController.getOrderById);

router.post("/discount/verify", authMiddleware.requireAuth, ordersController.verifyDiscountCode); // Verify discount code and return discount details

module.exports = router;