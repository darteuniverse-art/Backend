const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order" },
    // Default provider is Paystack for our use case, but can be extended in the future
    provider: {
      type: String,
      enum: ["paystack"],
      default: "paystack",
      required: true,
    },
    // Transaction reference, must be unique to prevent duplicate payments
    reference: { type: String, unique: true, required: true },
    amount: { type: Number, required: true },
    currency: { type: String, enum: ["NGN"], default: "NGN", required: true },
    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    paidAt: { type: Date, default: null },
  },
  { timestamps: true },
);

paymentSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model("Payment", paymentSchema);
