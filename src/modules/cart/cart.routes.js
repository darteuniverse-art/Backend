const express = require("express");
const router = express.Router();
const cartController = require("./cart.controller");

// Protected routes (require authentication)
router.get("/", cartController.getCart);
router.post("/items/:id", cartController.addToCart);
router.delete("/items/:id", cartController.removeFromCart);
router.delete("/clear", cartController.clearCart);

module.exports = router;