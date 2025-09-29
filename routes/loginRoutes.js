const express = require("express");
const { registerUser, activateUser, loginUser } = require("../controllers/loginController");

const router = express.Router();

// Auth Routes
router.post("/register", registerUser);
router.get("/activate/:token", activateUser);
router.post("/login", loginUser);

module.exports = router;
