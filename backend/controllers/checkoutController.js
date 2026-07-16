const Order = require("../models/Order");
const Cart = require("../models/Cart");

exports.placeOrder = async (req, res) => {
  

  try {

    const {
      name,
      phone,
      address,
      paymentMethod,
    } = req.body;

   const cart = await Cart.find({
    user: req.user.userId,
});
    if (cart.length === 0) {

      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });

    }

    const total = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

   const order = await Order.create({

      user: req.user.userId,

      name,
      phone,
      address,
      paymentMethod,

      items: cart,

      total,

});

  

   await Cart.deleteMany({
    user: req.user.userId,
});

    res.status(201).json({

      success: true,
      message: "Order placed successfully",

      order,

    });

  } catch (err) {

    res.status(500).json({

      success: false,
      message: err.message,

    });

  }

};
exports.getOrders = async (req, res) => {

  try {

    const orders = await Order.find({
  user: req.user.userId,
}).sort({
  createdAt: -1,
});

    res.json({

      success: true,

      orders,

    });

  } catch (err) {

    res.status(500).json({

      success: false,

      message: err.message,

    });

  }

};