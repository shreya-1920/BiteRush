const express = require("express");
const router = express.Router();

const {
  getAvailableCoupons,
  applyCoupon,
} = require("../controllers/couponController");

// No adminAuth here
router.get("/", getAvailableCoupons);

router.post("/apply", applyCoupon);

module.exports = router;