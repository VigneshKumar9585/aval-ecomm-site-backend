const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const sendMail = require("../utils/sendMail");

// ✅ REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password, address, city, zip, country } = req.body;

    if (!firstName || !lastName || !email || !phone || !password) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate activation token
    const activationToken = crypto.randomBytes(32).toString("hex");

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
      isActive: false,
      activationToken,
    });

    // Activation link
    const activationLink = `${process.env.CLIENT_URL}/activate/${activationToken}`;

    // Send activation email
    await sendMail(
      user.email,
      "Activate Your Account",
      `<h2>Hello ${user.firstName},</h2>
       <p>Click below to activate your account:</p>
       <a href="${activationLink}">${activationLink}</a>`
    );

    res.status(201).json({ message: "Registration successful. Please check your email to activate your account." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ ACTIVATE ACCOUNT
const activateUser = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ activationToken: token });
    if (!user) return res.status(400).json({ message: "Invalid or expired activation link" });

    user.isActive = true;
    user.activationToken = null;
    await user.save();

    res.status(200).json({ message: "Account activated successfully. You can now log in." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// ✅ LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    if (!user.isActive) return res.status(403).json({ message: "Please activate your account first" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({ message: "Login successful", token, user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { registerUser, activateUser, loginUser };
