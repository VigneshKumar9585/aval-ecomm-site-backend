const express = require("express");
const {
  getCartItems,
  addCartItem,
  updateCartItem,
  deleteCartItem
} = require("../controllers/cartCantroll"); // Make sure the filename matches exactly

const router = express.Router();

// Routes
router.get("/", getCartItems);            // Get all cart items
router.post("/", addCartItem);            // Add new cart item
router.put("/:id", updateCartItem);       // Update cart item by ID
router.delete("/:id", deleteCartItem);    // Delete cart item by ID

module.exports = router;
