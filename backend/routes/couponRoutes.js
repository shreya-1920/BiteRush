const express = require("express");
const router = express.Router();

const {
  getAllCoupons,
  getCouponById,
  createCoupon,
  updateCoupon,
  toggleCoupon,
  deleteCoupon,
} = require("../controllers/couponController");

const adminAuth = require("../middleware/adminAuth");

router.get("/", adminAuth, getAllCoupons);

router.get("/:id", adminAuth, getCouponById);

router.post("/", adminAuth, createCoupon);

router.put("/:id", adminAuth, updateCoupon);

router.patch("/:id/toggle", adminAuth, toggleCoupon);

router.delete("/:id", adminAuth, deleteCoupon);

module.exports = router;