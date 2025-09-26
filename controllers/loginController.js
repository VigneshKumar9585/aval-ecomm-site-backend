const User = require("../models/loginShema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// 🔑 REGISTER
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, address, city, zip, country } = req.body;

    if (!firstName || !lastName || !email || !phone || !password) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      address,
      city,
      zip,
      country,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// 🔑 LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ message: "Login successful", token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { registerUser, loginUser };
