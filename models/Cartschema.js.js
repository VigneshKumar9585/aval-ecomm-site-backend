const express = require('express');
const cartController = require('../controllers/cartController');

const cartRoutes = express.Router();

// ✅ Add item to cart
cartRoutes.post('/add-cart-item', cartController.addCartItem);

// ✅ Get all cart items
cartRoutes.get('/get-cart-items', cartController.getCartItems);

// ✅ Update cart item quantity
cartRoutes.put('/update-cart-item/:id',  cartController.updateCartItem);

// ✅ Delete cart item
cartRoutes.delete('/delete-cart-item/:id',  cartController.deleteCartItem);

module.exports = cartRoutes;
