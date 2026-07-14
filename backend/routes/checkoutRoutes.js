const express = require("express");

const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  placeOrder,
  getOrders,
} = require("../controllers/checkoutController");

router.post("/", authMiddleware, placeOrder);

router.get("/", authMiddleware, getOrders);

module.exports = router;