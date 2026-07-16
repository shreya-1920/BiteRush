const Cart = require("../models/Cart");
exports.addToCart = async (req, res) => {
  try {
    const { productId, name, image, price, quantity } = req.body;

   const existingItem = await Cart.findOne({
    user: req.user.userId,
    productId,
});

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
    user: req.user.userId,
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
    const cart = await Cart.find({
    user: req.user.userId,
});
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
    await Cart.findOneAndDelete({
    _id: req.params.id,
    user: req.user.userId,
});

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
   await Cart.deleteMany({
    user: req.user.userId,
});
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