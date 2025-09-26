const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = 4000;

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
mongoose
  .connect("mongodb://localhost:27017/class-vi", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.log("❌ Error in DB:", err));

// Routes

app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
