const Order = require("../models/Order");
const Menu = require("../models/Menu");

const getDashboard = async (req, res) => {
  try {
    const restaurantId = req.restaurant._id;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const now = new Date();

    const weekStart = new Date();
    weekStart.setDate(now.getDate() - 7);

    const monthStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    // ======================
    // Stats
    // ======================

    const todayOrders = await Order.countDocuments({
      restaurant: restaurantId,
      createdAt: { $gte: today },
    });

    const pendingOrders = await Order.countDocuments({
      restaurant: restaurantId,
      status: "Pending",
    });

    const todaySalesAgg = await Order.aggregate([
      {
        $match: {
          restaurant: restaurantId,
          status: "Delivered",
          createdAt: { $gte: today },
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$total",
          },
        },
      },
    ]);

    const totalMenuItems = await Menu.countDocuments({
      restaurant: restaurantId,
    });

    const availableDishes = await Menu.countDocuments({
      restaurant: restaurantId,
      status: "Available",
    });

    // ======================
    // Recent Orders
    // ======================

    const recentOrders = await Order.find({
      restaurant: restaurantId,
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("_id name email total status");

    // ======================
    // Popular Dishes
    // ======================

    const popularDishes = await Order.aggregate([
      {
        $match: {
          restaurant: restaurantId,
          status: "Delivered",
        },
      },
      {
        $unwind: "$items",
      },
      {
        $group: {
          _id: "$items.name",

          name: {
            $first: "$items.name",
          },

          image: {
            $first: "$items.image",
          },

          orders: {
            $sum: "$items.quantity",
          },
        },
      },
      {
        $sort: {
          orders: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    // ======================
    // Notifications
    // ======================

    const notifications = await Order.find({
      restaurant: restaurantId,
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .select("name total status createdAt");

    // ======================
    // Sales Overview
    // ======================

    const filter = req.query.filter || "week";

    let salesOverview = [];

    if (filter === "day") {
      const labels = [
        "12 AM",
        "3 AM",
        "6 AM",
        "9 AM",
        "12 PM",
        "3 PM",
        "6 PM",
        "9 PM",
      ];

      salesOverview = labels.map((label) => ({
        label,
        sales: 0,
      }));

      const hourlyData = await Order.aggregate([
        {
          $match: {
            restaurant: restaurantId,
            status: "Delivered",
            createdAt: { $gte: today },
          },
        },
        {
          $group: {
            _id: { $hour: "$createdAt" },
            sales: { $sum: "$total" },
          },
        },
      ]);

      hourlyData.forEach((item) => {
        const index = Math.floor(item._id / 3);

        if (index >= 0 && index < salesOverview.length) {
          salesOverview[index].sales = item.sales;
        }
      });
    } else if (filter === "week") {
      const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

      salesOverview = labels.map((label) => ({
        label,
        sales: 0,
      }));

      const weeklyData = await Order.aggregate([
        {
          $match: {
            restaurant: restaurantId,
            status: "Delivered",
            createdAt: { $gte: weekStart },
          },
        },
        {
          $group: {
            _id: { $dayOfWeek: "$createdAt" },
            sales: { $sum: "$total" },
          },
        },
      ]);

      weeklyData.forEach((item) => {
        salesOverview[item._id - 1].sales = item.sales;
      });
    } else if (filter === "month") {
      const days = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0
      ).getDate();

      salesOverview = [];

      for (let i = 1; i <= days; i++) {
        salesOverview.push({
          label: i.toString(),
          sales: 0,
        });
      }

      const monthlyData = await Order.aggregate([
        {
          $match: {
            restaurant: restaurantId,
            status: "Delivered",
            createdAt: { $gte: monthStart },
          },
        },
        {
          $group: {
            _id: { $dayOfMonth: "$createdAt" },
            sales: { $sum: "$total" },
          },
        },
      ]);

      monthlyData.forEach((item) => {
        salesOverview[item._id - 1].sales = item.sales;
      });
    }

    // ======================
    // Response
    // ======================

    res.json({
      success: true,

      stats: {
        todaySales: todaySalesAgg[0]?.total || 0,

        todayOrders,

        pendingOrders,

        totalMenuItems,

        availableDishes,

        unavailableDishes: totalMenuItems - availableDishes,

        availablePercentage:
          totalMenuItems > 0
            ? Math.round(
                (availableDishes / totalMenuItems) * 100
              )
            : 0,
      },

      recentOrders,

      popularDishes,

      salesOverview,

      notifications,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = {
  getDashboard,
};