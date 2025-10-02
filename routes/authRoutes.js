const express = require("express");
const { registerUser, activateUser, loginUser } = require("../controllers/authController");
const router = express.Router();

// Register
router.post("/register", registerUser);

// Activate
router.get("/activate/:token", activateUser);

// Login
router.post("/login", loginUser);

module.exports = router;
