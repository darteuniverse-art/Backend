const express = require("express");
const authMiddleware = require("../../shared/middleware/auth");
const adminController = require("./admin.controller");
const router = express.Router();

router.use(authMiddleware.requireAdmin); // Apply admin guard to all routes in this router

router.get("/users", adminController.getAllUsers);
router.get("/sellers", adminController.getAllSellers);
router.post("/approve-seller/:id", adminController.approveSeller);
router.post("/reject-seller/:id", adminController.rejectSeller);
router.post("/suspend-seller/:id", adminController.suspendSeller);

router.delete("/products/:id", adminController.deleteProduct);
router.get("/orders", adminController.getAllOrders);
router.get("/orders/:id", adminController.getOrderById);

// Discount Code Endpoints (optional, can be managed by admin)
router.get("/discount-codes", authMiddleware.requireAdmin, ordersController.getDiscountCodes); 
router.post("/discount-codes", authMiddleware.requireAdmin, ordersController.createDiscountCode); 
router.put("/discount-codes/:code", authMiddleware.requireAdmin, ordersController.updateDiscountCode); 
router.delete("/discount-codes/:code", authMiddleware.requireAdmin, ordersController.deleteDiscountCode);

module.exports = router;

module.exports = router;
