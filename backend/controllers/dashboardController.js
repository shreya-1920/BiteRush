const Order = require("../models/Order");
const User = require("../models/User");
const Restaurant = require("../models/Restaurant");

const getDashboardStats = async (req, res) => {
  try {
    // Counts
    const totalOrders = await Order.countDocuments();
    const totalCustomers = await User.countDocuments();
    const totalRestaurants = await Restaurant.countDocuments();

    const pendingOrders = await Order.countDocuments({
      status: "Pending",
    });

    const deliveredOrders = await Order.countDocuments({
      status: "Delivered",
    });

    // Revenue
    const delivered = await Order.find({
      status: "Delivered",
    });

    const totalRevenue = delivered.reduce(
      (sum, order) => sum + order.total,
      0
    );

    // Weekly Revenue
    const revenueData = await Order.aggregate([
      {
        $match: {
          status: "Delivered",
        },
      },
      {
        $group: {
          _id: {
            $dayOfWeek: "$createdAt",
          },
          revenue: {
            $sum: "$total",
          },
        },
      },
    ]);

    const weeklyRevenue = [
      { day: "Sun", revenue: 0 },
      { day: "Mon", revenue: 0 },
      { day: "Tue", revenue: 0 },
      { day: "Wed", revenue: 0 },
      { day: "Thu", revenue: 0 },
      { day: "Fri", revenue: 0 },
      { day: "Sat", revenue: 0 },
    ];

    revenueData.forEach((item) => {
      weeklyRevenue[item._id - 1].revenue = item.revenue;
    });

    // Recent Orders
    const recentOrders = await Order.find()
      .populate("user", "name email")
      .populate("restaurant", "name")
      .sort({ createdAt: -1 })
      .limit(5);

    // Latest Customers
    const latestCustomers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5);

    // Top Restaurants
    const topRestaurants = await Restaurant.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.status(200).json({
      totalOrders,
      totalCustomers,
      totalRestaurants,
      pendingOrders,
      deliveredOrders,
      totalRevenue,
      weeklyRevenue,
      recentOrders,
      latestCustomers,
      topRestaurants,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};