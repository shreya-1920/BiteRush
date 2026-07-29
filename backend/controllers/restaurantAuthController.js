const bcrypt = require("bcryptjs");
const Restaurant = require("../models/Restaurant");
const generateRestaurantToken = require("../utils/generateRestaurantToken");

// @desc    Restaurant Login
// @route   POST /api/restaurant/login
// @access  Public

const loginRestaurant = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required.",
      });
    }

    // Find Restaurant
    const restaurant = await Restaurant.findOne({
      email: email.toLowerCase(),
    }).select("+password");

    if (!restaurant) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Compare Password
    const isMatch = await bcrypt.compare(password, restaurant.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = generateRestaurantToken(restaurant._id);

    restaurant.password = undefined;

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      restaurant,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// @desc    Get Current Restaurant
// @route   GET /api/restaurant/me
// @access  Private

const getCurrentRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.restaurant._id).select(
      "-password"
    );

    res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
// @desc    Get Restaurant Profile
// @route   GET /api/restaurant/profile
// @access  Private

const getRestaurantProfile = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.restaurant._id).select("-password");

    res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// @desc    Update Restaurant Profile
// @route   PUT /api/restaurant/profile
// @access  Private

const updateRestaurantProfile = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.restaurant._id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    Object.assign(restaurant, req.body);

    await restaurant.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      restaurant,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
module.exports = {
  loginRestaurant,
  getCurrentRestaurant,
  getRestaurantProfile,
  updateRestaurantProfile,
};