const express = require("express");
const router = express.Router();
const authMiddleware = require("../../shared/middleware/auth");
const sellerController = require("./seller.controller");

// Application Routes
router.post("/apply", authMiddleware.requireAuth, sellerController.applyForSeller);
router.get("/status", authMiddleware.requireAuth, sellerController.getSellerStatus);

// Seller Routes (require authentication)
// Product routes for sellers to manage their products
router.get("/products", authMiddleware.requireSeller, sellerController.getSellerProducts);
router.post("/products", authMiddleware.requireSeller, sellerController.createSellerProduct);
router.put("/products/:id", authMiddleware.requireSeller, sellerController.updateSellerProduct);
router.delete("/products/:id", authMiddleware.requireSeller, sellerController.deleteSellerProduct);
// Order routes for sellers to manage their orders
router.get("/orders", authMiddleware.requireSeller, sellerController.getSellerOrders);
router.get("/orders/:id", authMiddleware.requireSeller, sellerController.getSellerOrderById);
router.put("/orders/:id/status", authMiddleware.requireSeller, sellerController.updateSellerOrderStatus);

module.exports = router;
