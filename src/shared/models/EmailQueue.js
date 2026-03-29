const mongoose = require("mongoose");
const emailQueueSchema = new mongoose.Schema({
    to: { type: String, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    text: { type: String, required: true },
    status: { type: String, enum: ["pending", "sent", "failed"], default: "pending" },
    retries: { type: Number, default: 0 },
    lastError: { type: String, default: null },
}, { timestamps: true });

module.exports = mongoose.model("EmailQueue", emailQueueSchema);