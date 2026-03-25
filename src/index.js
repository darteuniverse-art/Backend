const dotenv = require("dotenv");
dotenv.config({path: ".env.local"});
const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 1000;

// Database connection
if (!process.env.MONGO_URI) {
  console.error("MONGO_URI not set in environment! Exiting.");
  process.exit(1);
}

mongoose.connect(process.env.MONGO_URI);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("✅ Connected to MongoDB");
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on PORT ${PORT}`);
});
