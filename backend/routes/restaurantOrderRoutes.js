const express = require("express");

const router = express.Router();

const restaurantAuth = require("../middleware/restaurantAuth");

const {
  getRestaurantOrders,
  getRestaurantOrder,
  updateOrderStatus,
} = require("../controllers/restaurantOrderController");

// Get all orders of logged-in restaurant
router.get("/orders", restaurantAuth, getRestaurantOrders);

// Get single order
router.get("/orders/:id", restaurantAuth, getRestaurantOrder);

// Update order status
router.patch("/orders/:id/status", restaurantAuth, updateOrderStatus);

module.exports = router;