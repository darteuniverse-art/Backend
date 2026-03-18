const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema(
    {
        email: { type: String, required: true },
        code: { type: String, required: true },
    },
    { timestamps: true },
);

otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 }); // Auto-delete OTPs after 10 minutes
otpSchema.index({ email: 1 });

module.exports = mongoose.model("Otp", otpSchema);