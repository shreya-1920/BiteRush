const Cart = require("../models/Cart");

// =========================
// Add Item to Cart
// =========================
exports.addToCart = async (req, res) => {
  try {
    const {
      restaurant,
      productId,
      name,
      image,
      price,
      quantity = 1,
    } = req.body;

    // Check if cart already contains items
    const cartItems = await Cart.find({
      user: req.user.userId,
    });

    // Prevent adding items from another restaurant
    if (
      cartItems.length > 0 &&
      cartItems[0].restaurant.toString() !== restaurant
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Your cart contains items from another restaurant. Please clear your cart first.",
      });
    }

    // Check if product already exists in cart
    const existingItem = await Cart.findOne({
      user: req.user.userId,
      productId,
    });

    if (existingItem) {
      existingItem.quantity += quantity;

      await existingItem.save();

      return res.status(200).json({
        success: true,
        message: "Quantity updated.",
        cart: existingItem,
      });
    }

    // Create new cart item
    const cartItem = await Cart.create({
      user: req.user.userId,
      restaurant,
      productId,
      name,
      image,
      price,
      quantity,
    });

    return res.status(201).json({
      success: true,
      message: "Item added to cart.",
      cart: cartItem,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// Get Cart
// =========================
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.find({
      user: req.user.userId,
    });

    return res.status(200).json({
      success: true,
      cart,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// Update Cart Quantity
// =========================
exports.updateCart = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cart = await Cart.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.userId,
      },
      {
        quantity,
      },
      {
        new: true,
      }
    );

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found.",
      });
    }

    return res.status(200).json({
      success: true,
      cart,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// Remove Cart Item
// =========================
exports.removeCartItem = async (req, res) => {
  try {
    const cart = await Cart.findOneAndDelete({
      _id: req.params.id,
      user: req.user.userId,
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Item removed from cart.",
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =========================
// Clear Entire Cart
// =========================
exports.clearCart = async (req, res) => {
  try {
    await Cart.deleteMany({
      user: req.user.userId,
    });

    return res.status(200).json({
      success: true,
      message: "Cart cleared.",
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};