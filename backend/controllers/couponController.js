const Coupon = require("../models/Coupon");

// Get All Coupons
const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find().sort({ createdAt: -1 });

    res.status(200).json(coupons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Single Coupon
const getCouponById = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);

    if (!coupon) {
      return res.status(404).json({
        message: "Coupon not found",
      });
    }

    res.status(200).json(coupon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create Coupon
const createCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);

    res.status(201).json({
      message: "Coupon created successfully",
      coupon,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Coupon
const updateCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!coupon) {
      return res.status(404).json({
        message: "Coupon not found",
      });
    }

    res.status(200).json({
      message: "Coupon updated successfully",
      coupon,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Activate / Deactivate Coupon
const toggleCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);

    if (!coupon) {
      return res.status(404).json({
        message: "Coupon not found",
      });
    }

    coupon.isActive = !coupon.isActive;

    await coupon.save();

    res.status(200).json({
      message: coupon.isActive
        ? "Coupon activated"
        : "Coupon deactivated",
      coupon,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete Coupon
const deleteCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);

    if (!coupon) {
      return res.status(404).json({
        message: "Coupon not found",
      });
    }

    await coupon.deleteOne();

    res.status(200).json({
      message: "Coupon deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const getAvailableCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find({
      isActive: true,
      expiryDate: { $gte: new Date() },
    }).sort({ createdAt: -1 });

    res.json(coupons);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
const applyCoupon = async (req, res) => {
  try {
    const { code, subtotal } = req.body;

    const coupon = await Coupon.findOne({
      code: code.toUpperCase(),
      isActive: true,
    });

    if (!coupon) {
      return res.status(404).json({
        message: "Invalid coupon code",
      });
    }

    if (new Date(coupon.expiryDate) < new Date()) {
      return res.status(400).json({
        message: "Coupon has expired",
      });
    }

    if (subtotal < coupon.minimumAmount) {
      return res.status(400).json({
        message: `Minimum order ₹${coupon.minimumAmount} required`,
      });
    }

    let discount = 0;

    if (coupon.discountType === "Percentage") {
      discount = (subtotal * coupon.discountValue) / 100;

      if (coupon.maximumDiscount) {
        discount = Math.min(
          discount,
          coupon.maximumDiscount
        );
      }
    } else {
      discount = coupon.discountValue;
    }

    res.json({
      success: true,
      coupon: coupon.code,
      discount,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
module.exports = {
  getAllCoupons,
  getCouponById,
  createCoupon,
  updateCoupon,
  toggleCoupon,
  deleteCoupon,
  getAvailableCoupons,
  applyCoupon,
};