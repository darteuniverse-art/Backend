// Auth middleware should return 401 for failed authentication and 403 for failed authorization
const requireAuth = async (req, res, next) => {
  // Placeholder for auth middleware logic
  // This is where we'll verify user sessions
  next();
};

const requireRole = async (roles) => {
  return (req, res, next) => {
    // Placeholder for role-based access control logic
    // Should check if the active user's role matches the allowed roles argument
    // Seller check should watch out for suspensions via the isSuspended flag on the seller model
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
