const Cart = require("../models/Cart");
exports.addToCart = async (req, res) => {
  try {
    const { productId, name, image, price, quantity } = req.body;

    const existingItem = await Cart.findOne({ productId });

    if (existingItem) {
      existingItem.quantity += quantity || 1;
      await existingItem.save();

      return res.json({
        success: true,
        message: "Quantity updated",
        cart: existingItem,
      });
    }

    const cartItem = await Cart.create({
      productId,
      name,
      image,
      price,
      quantity,
    });

    res.status(201).json({
      success: true,
      message: "Item added to cart",
      cart: cartItem,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.find();

    res.json({
      success: true,
      cart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};




exports.updateCart = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cart = await Cart.findByIdAndUpdate(
      req.params.id,
      { quantity },
      { new: true }
    );

    res.json({
      success: true,
      cart,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


exports.removeCartItem = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Item removed",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


exports.clearCart = async (req, res) => {
  try {
    await Cart.deleteMany();

    res.json({
      success: true,
      message: "Cart cleared",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};