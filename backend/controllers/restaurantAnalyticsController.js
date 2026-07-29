const Order = require("../models/Order");
const Restaurant = require("../models/Restaurant");

const getAnalytics = async (req, res) => {
  try {
    const restaurantId = req.restaurant._id;

    // ==========================
    // Date Calculations
    // ==========================

    const now = new Date();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const weekStart = new Date();
    weekStart.setDate(now.getDate() - 7);

    const monthStart = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    );

    // ==========================
    // Sales
    // ==========================

    const totalSalesAgg = await Order.aggregate([
      {
        $match: {
          restaurant: restaurantId,
          status: "Delivered",
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

    const todaySalesAgg = await Order.aggregate([
      {
        $match: {
          restaurant: restaurantId,
          status: "Delivered",
          createdAt: {
            $gte: today,
          },
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

    const weeklySalesAgg = await Order.aggregate([
      {
        $match: {
          restaurant: restaurantId,
          status: "Delivered",
          createdAt: {
            $gte: weekStart,
          },
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

    const monthlySalesAgg = await Order.aggregate([
      {
        $match: {
          restaurant: restaurantId,
          status: "Delivered",
          createdAt: {
            $gte: monthStart,
          },
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

    // ==========================
    // Orders
    // ==========================

    const totalOrders = await Order.countDocuments({
      restaurant: restaurantId,
    });

    const pendingOrders = await Order.countDocuments({
      restaurant: restaurantId,
      status: "Pending",
    });

    const confirmedOrders = await Order.countDocuments({
      restaurant: restaurantId,
      status: "Confirmed",
    });

    const preparingOrders = await Order.countDocuments({
      restaurant: restaurantId,
      status: "Preparing",
    });

    const outForDeliveryOrders =
      await Order.countDocuments({
        restaurant: restaurantId,
        status: "Out for Delivery",
      });

    const deliveredOrders =
      await Order.countDocuments({
        restaurant: restaurantId,
        status: "Delivered",
      });

    const cancelledOrders =
      await Order.countDocuments({
        restaurant: restaurantId,
        status: "Cancelled",
      });

    // ==========================
    // Customers
    // ==========================

    const customerAgg = await Order.aggregate([
      {
        $match: {
          restaurant: restaurantId,
        },
      },
      {
        $group: {
          _id: "$user",
        },
      },
      {
        $count: "customers",
      },
    ]);

    const totalCustomers =
      customerAgg[0]?.customers || 0;

    // ==========================
    // Restaurant Rating
    // ==========================

    const restaurant = await Restaurant.findById(
      restaurantId
    ).select("rating");
        // ==========================
    // Peak Hour
    // ==========================

    const peakHourAgg = await Order.aggregate([
      {
        $match: {
          restaurant: restaurantId,
        },
      },
      {
        $group: {
          _id: {
            $hour: "$createdAt",
          },
          orders: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          orders: -1,
        },
      },
      {
        $limit: 1,
      },
    ]);

    let peakHour = "N/A";

    if (peakHourAgg.length) {
      const hour = peakHourAgg[0]._id;

      if (hour === 0) {
        peakHour = "12 AM";
      } else if (hour < 12) {
        peakHour = `${hour} AM`;
      } else if (hour === 12) {
        peakHour = "12 PM";
      } else {
        peakHour = `${hour - 12} PM`;
      }
    }

    // ==========================
    // Best Selling Category
    // ==========================

    const bestCategoryAgg = await Order.aggregate([
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
        $lookup: {
          from: "menus",
          localField: "items.menuItem",
          foreignField: "_id",
          as: "menu",
        },
      },
      {
        $unwind: "$menu",
      },
      {
        $group: {
          _id: "$menu.category",
          sold: {
            $sum: "$items.quantity",
          },
        },
      },
      {
        $sort: {
          sold: -1,
        },
      },
      {
        $limit: 1,
      },
    ]);

    const bestCategory =
      bestCategoryAgg[0]?._id || "N/A";

    // ==========================
    // Top Selling Dishes
    // ==========================

    const topDishesAgg = await Order.aggregate([
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
          totalOrders: {
            $sum: "$items.quantity",
          },
          totalSales: {
            $sum: {
              $multiply: [
                "$items.quantity",
                "$items.price",
              ],
            },
          },
        },
      },
      {
        $sort: {
          totalOrders: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);
const topDishes = topDishesAgg.map((dish) => ({
  name: dish._id,
  orders: dish.totalOrders,
  sales: dish.totalSales,
}));
    // ==========================
    // Monthly Sales Chart
    // ==========================

 // ==========================
// Sales Chart
// ==========================

const filter = req.query.filter || "week";

let salesChart = [];

if (filter === "day") {

    const labels = [
        "12 AM", "3 AM", "6 AM", "9 AM",
        "12 PM", "3 PM", "6 PM", "9 PM"
    ];

    salesChart = labels.map(label => ({
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

    hourlyData.forEach(item => {
        const index = Math.floor(item._id / 3);

        if (index >= 0 && index < salesChart.length) {
            salesChart[index].sales = item.sales;
        }
    });

} else if (filter === "week") {

    const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    salesChart = labels.map(label => ({
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
                _id: {
                    $dayOfWeek: "$createdAt",
                },
                sales: {
                    $sum: "$total",
                },
            },
        },
    ]);

    weeklyData.forEach(item => {
        salesChart[item._id - 1].sales = item.sales;
    });

} else if (filter === "month") {

    const daysInMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0
    ).getDate();

    salesChart = [];

    for (let i = 1; i <= daysInMonth; i++) {
        salesChart.push({
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
                _id: {
                    $dayOfMonth: "$createdAt",
                },
                sales: {
                    $sum: "$total",
                },
            },
        },
    ]);

    monthlyData.forEach(item => {
        salesChart[item._id - 1].sales = item.sales;
    });

}
 
        // ==========================
    // Response
    // ==========================

    res.status(200).json({
      success: true,

      stats: {
        totalSales: totalSalesAgg[0]?.total || 0,
        todaySales: todaySalesAgg[0]?.total || 0,
        weeklySales: weeklySalesAgg[0]?.total || 0,
        monthlySales: monthlySalesAgg[0]?.total || 0,

        totalOrders,
        pendingOrders,
        confirmedOrders,
        preparingOrders,
        outForDeliveryOrders,
        deliveredOrders,
        cancelledOrders,

        totalCustomers,

        averageRating: restaurant?.rating || 0,
      },

      topDishes,

      salesChart,

      todaySummary: {
        peakHour,
        bestCategory,
        pendingOrders,
      },
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

module.exports = {
  getAnalytics,
};