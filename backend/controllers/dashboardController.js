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
  const totalSales = await Order.countDocuments({
  status: "Delivered",
});

    // Weekly Revenue
   const salesData = await Order.aggregate([
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
      sales: {
        $sum: 1,
      },
    },
  },
]);
   const weeklySales = [
  { day: "Sun", sales: 0 },
  { day: "Mon", sales: 0 },
  { day: "Tue", sales: 0 },
  { day: "Wed", sales: 0 },
  { day: "Thu", sales: 0 },
  { day: "Fri", sales: 0 },
  { day: "Sat", sales: 0 },
];

    salesData.forEach((item) => {
  weeklySales[item._id - 1].sales = item.sales;
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
   const restaurants = await Restaurant.find();

const rankedRestaurants = await Promise.all(

  restaurants.map(async (restaurant) => {

    const deliveredOrders = await Order.find({
      restaurant: restaurant._id,
      status: "Delivered",
    });

    return {
      _id: restaurant._id,
      name: restaurant.name,
      logo: restaurant.logo,
      cuisine: restaurant.cuisine,
      city: restaurant.city,
      rating: restaurant.rating,
      totalOrders: deliveredOrders.length,
      revenue: deliveredOrders.reduce(
        (sum, order) => sum + order.total,
        0
      ),
    };

  })

);

rankedRestaurants.sort(
  (a, b) => b.totalOrders - a.totalOrders
);

const topRestaurants = rankedRestaurants.slice(0,5);

    res.status(200).json({
      totalOrders,
      totalCustomers,
      totalRestaurants,
      pendingOrders,
      deliveredOrders,
     totalSales,
weeklySales,
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