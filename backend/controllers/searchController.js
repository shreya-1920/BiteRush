const Restaurant = require("../models/Restaurant");
const User = require("../models/User");
const Order = require("../models/Order");
const Coupon = require("../models/Coupon");
const Contact = require("../models/Contact");

exports.globalSearch = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.json([]);
    }

    const regex = new RegExp(query, "i");

    const restaurants = await Restaurant.find({
      name: regex,
    }).select("name");

    const customers = await User.find({
      role: "customer",
      $or: [
        { name: regex },
        { email: regex },
      ],
    }).select("name email");

    const coupons = await Coupon.find({
      code: regex,
    }).select("code");

    const messages = await Contact.find({
      $or: [
        { name: regex },
        { email: regex },
        { subject: regex },
      ],
    }).select("name subject");

    const orders = await Order.find()
      .populate("user", "name")
      .populate("restaurant", "name");

    const matchedOrders = orders.filter(
      (order) =>
        order.user?.name?.match(regex) ||
        order.restaurant?.name?.match(regex) ||
        order.status?.match(regex)
    );

    const results = [];

    restaurants.forEach((item) =>
      results.push({
        title: item.name,
        type: "Restaurant",
        route: "/admin/restaurants",
      })
    );

    customers.forEach((item) =>
      results.push({
        title: item.name,
        subtitle: item.email,
        type: "Customer",
        route: "/admin/customers",
      })
    );

    coupons.forEach((item) =>
      results.push({
        title: item.code,
        type: "Coupon",
        route: "/admin/coupons",
      })
    );

    messages.forEach((item) =>
      results.push({
        title: item.name,
        subtitle: item.subject,
        type: "Message",
        route: "/admin/messages",
      })
    );

    matchedOrders.forEach((item) =>
      results.push({
        title: item.user?.name,
        subtitle: item.restaurant?.name,
        type: "Order",
        route: "/admin/orders",
      })
    );

    res.json(results);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};