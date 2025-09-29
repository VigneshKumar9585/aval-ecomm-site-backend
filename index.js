const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/loginRoutes");



const app = express();
app.use(express.json());

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ✅ Routes
app.use("/api/auth", authRoutes);

// ✅ Start server
const PORT = process.env.PORT || 5001; // use 5001 instead of 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

