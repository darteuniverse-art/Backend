 const express = require("express");
const router = express.Router();
const authMiddleware = require("../../shared/middleware/auth");
const productsController = require("./products.controller");

// Public Routes
router.get("/", productsController.getProducts); // Accepts query parameters for searching
router.get("/:id", productsController.getProductById);
router.get("/category/:category", productsController.getProductsByCategory);
router.get("/recommended", productsController.getRecommendedProducts); // Auth is optional here - can show personalized recommendations if logged in, or general popular products if not

// Protected routes (require authentication)
router.post("/rate/:id", authMiddleware.requireAuth, productsController.rateProduct); // Allow users to rate products

// Seller Routes (require authentication)
router.post("/", authMiddleware.requireSeller, productsController.createProduct);
router.put("/:id", authMiddleware.requireSeller, productsController.updateProduct);
router.delete("/:id", authMiddleware.requireSeller, productsController.deleteProduct);

module.exports = router;
