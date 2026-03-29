const { Seller } = require("../../modules/seller/models")
// Auth middleware should return 401 for failed authentication and 403 for failed authorization
const requireAuth = async (req, res, next) => {
  // Check for user in active session
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

const requireRole = (roles) => {
  return async (req, res, next) => {
    // Check for active user
    const user = req.session.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Check to see if role matches
    if (!roles.includes(user.role))
      return res.status(403).json({ message: "Forbidden" });
    // Verifies seller is not suspended
    if (user.role === "seller") {
      const seller = await Seller.findOne({userId: user.id});
      if (seller && seller.isSuspended) {
        return res.status(403).json({ message: "Suspended" });
      }
    }
    next();
  };
};

const requireSellerOrAdmin = requireRole(["seller", "admin"]);
const requireAdmin = requireRole(["admin"]);
const requireSeller = requireRole(["seller"]);

module.exports = {
  requireAuth,
  requireSellerOrAdmin,
  requireAdmin,
  requireSeller,
};
