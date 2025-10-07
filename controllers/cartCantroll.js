const CartItem = require("../models/Cartschema.js");

const cartController = {
  // ✅ Add item to cart
  addCartItem: async (req, res) => {
    try {
      const { userId, productName, quantity, price } = req.body;

      // Validation
      if (!userId || !productName || !price) {
        return res.status(400).json({
          message: "userId, productName, and price are required",
        });
      }

      const newItem = new CartItem({
        userId,
        productName,
        quantity: quantity || 1,
        price,
      });

      const savedItem = await newItem.save();
      res.status(201).json({
        message: "Item added to cart successfully",
        item: savedItem,
      });
    } catch (error) {
      console.error("❌ Error adding cart item:", error);
      res
        .status(500)
        .json({ message: "Error adding cart item", error: error.message });
    }
  },

  // ✅ Get all cart items
  getCartItems: async (req, res) => {
    try {
      const items = await CartItem.find();
      res.status(200).json({
        message: "Cart items fetched successfully",
        data: items,
      });
    } catch (error) {
      console.error("❌ Error fetching cart items:", error);
      res
        .status(500)
        .json({ message: "Error fetching cart items", error: error.message });
    }
  },

  // ✅ Update cart item quantity
  updateCartItem: async (req, res) => {
    const id = req.params.id;
    try {
      const { quantity } = req.body;

      if (!quantity || quantity <= 0) {
        return res
          .status(400)
          .json({ message: "Quantity must be greater than 0" });
      }

      const updatedItem = await CartItem.findByIdAndUpdate(
        id,
        { quantity },
        { new: true }
      );

      if (!updatedItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }

      res.status(200).json({
        message: "Cart item updated successfully",
        data: updatedItem,
      });
    } catch (error) {
      console.error("❌ Error updating cart item:", error);
      res
        .status(500)
        .json({ message: "Error updating cart item", error: error.message });
    }
  },

  // ✅ Delete cart item
  deleteCartItem: async (req, res) => {
    const id = req.params.id;
    try {
      const deletedItem = await CartItem.findByIdAndDelete(id);

      if (!deletedItem) {
        return res.status(404).json({ message: "Cart item not found" });
      }

      res.status(200).json({
        message: "Cart item deleted successfully",
        data: deletedItem,
      });
    } catch (error) {
      console.error("❌ Error deleting cart item:", error);
      res
        .status(500)
        .json({ message: "Error deleting cart item", error: error.message });
    }
  },
};

module.exports = cartController;
