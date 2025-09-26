const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    address: { type: String },
    city: { type: String },
    zip: { type: String },
    country: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
