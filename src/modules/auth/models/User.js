const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["user", "seller", "admin"], default: "user" },
    profilePictureKey: { type: String },
    favoriteProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true },
);

userSchema.methods.setPassword = async function (password) {
    const saltRounds = 10;
    this.passwordHash = await bcrypt.hash(password, saltRounds);
};

userSchema.methods.validatePassword = async function (password) {
    return await bcrypt.compare(password, this.passwordHash);
};

module.exports = mongoose.model("User", userSchema);