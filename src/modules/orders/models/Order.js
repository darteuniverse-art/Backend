const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
      pricePaid: Number,
      currencyPaid: { type: String, enum: ["NGN", "USD"], default: "NGN" },
      title: String,
      isPhysical: Boolean,
    },
  ],

  // Physical Fulfillment
  deliveryStatus: {
    type: String,
    enum: ["pending", "awaiting_delivery", "delivered"],
    default: "pending",
  },
  customerDetails: {
    fullName: String,
    phone: String,
    address: String,
    city: String,
    instructions: String,
    state: String,
    country: String,
  },

  createdAt: { type: Date, default: Date.now },
});

orderSchema.index({ userId: 1, createdAt: -1 });

module.exports = mongoose.model("Order", orderSchema);
