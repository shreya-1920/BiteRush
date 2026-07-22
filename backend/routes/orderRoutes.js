const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminAuth = require("../middleware/adminAuth");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  createOrder,
  getMyOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} = require("../controllers/orderController");

/* ===========================
   Customer Routes
=========================== */

// Place Order
router.post("/", authMiddleware, createOrder);

// Customer Orders
router.get("/my-orders", authMiddleware, getMyOrders);

/* ===========================
   Admin Routes
=========================== */

// Get All Orders
router.get("/", adminAuth, adminMiddleware, getAllOrders);

// Get Order by ID
router.get("/:id", adminAuth, adminMiddleware, getOrderById);

// Update Order Status
router.put(
  "/:id/status",
  adminAuth,
  adminMiddleware,
  updateOrderStatus
);

// Delete Order
router.delete(
  "/:id",
  adminAuth,
  adminMiddleware,
  deleteOrder
);

module.exports = router;