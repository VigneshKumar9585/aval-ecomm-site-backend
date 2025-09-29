const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  phone: String,
  password: String,
  address: String,
  city: String,
  zip: String,
  country: String,
  isActive: { type: Boolean, default: false },
  activationToken: String,
});

module.exports = mongoose.model("User", loginSchema);
