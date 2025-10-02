const mongoose = require("mongoose");

const loginSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: String,
  password: { type: String, required: true },
  address: String,
  city: String,
  zip: String,
  country: String,
  isActive: { type: Boolean, default: false },
  activationToken: String,
});

module.exports = mongoose.model("User", loginSchema);
