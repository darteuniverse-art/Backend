const mongoose = require("mongoose");

const discountCodeSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    discountValue: { type: Number, required: true },
    expiresAt: { type: Date, required: true },
    usageLimit: { type: Number, default: null }, // null means unlimited until expiration
    usedCount: { type: Number, default: 0 },
  },
  { timestamps: true },
);

discountCodeSchema.methods.isValid = function () {
  if (this.expiresAt < new Date()) {
    return false; // Code has expired
  }
  if (this.usageLimit !== null && this.usedCount >= this.usageLimit) {
    return false; // Usage limit reached
  }
  return true; // Code is valid
};

module.exports = mongoose.model("DiscountCode", discountCodeSchema);
