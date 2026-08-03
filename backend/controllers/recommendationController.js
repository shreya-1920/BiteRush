const Order = require("../models/Order");
const Menu = require("../models/Menu");
const Cart = require("../models/Cart");

exports.getRecommendations = async (req, res) => {
  try {

    const userId = req.user.userId;

    // Current Cart
    const cart = await Cart.find({ user: userId });

    // If cart is empty
    if (cart.length === 0) {

      return res.json({
        success: true,
        reason: "Start adding items to get recommendations.",
        recommendations: [],
      });

    }

    // Restaurant of current cart
    const restaurantId = cart[0].restaurant;

    // Cart Items
    const cartIds = cart.map(item => item.productId.toString());

    // Previous Orders
    const orders = await Order.find({ user: userId });

    const orderedIds = [];

    orders.forEach(order => {

      order.items.forEach(item => {

        if (item.menuItem) {
          orderedIds.push(item.menuItem.toString());
        }

      });

    });

    // Exclude already ordered + already in cart
    const exclude = [...new Set([...cartIds, ...orderedIds])];

    // Recommend from SAME restaurant only
    const recommendations = await Menu.find({

      restaurant: restaurantId,

      status: "Available",

      _id: {
        $nin: exclude,
      }

    }).limit(4);

    // If user already ordered everything
    if (recommendations.length === 0) {

      const meals = await Menu.find({

        restaurant: restaurantId,

        status: "Available",

        _id: {
          $nin: cartIds,
        }

      }).limit(4);

      return res.json({

        success: true,

        reason: "👨‍🍳 More dishes from this restaurant",

        recommendations: meals,

      });

    }

    return res.json({

      success: true,

      reason: "❤️ Frequently ordered together",

      recommendations,

    });

  }

  catch (err) {

    console.log(err);

    res.status(500).json({

      success: false,

      message: err.message,

    });

  }

};