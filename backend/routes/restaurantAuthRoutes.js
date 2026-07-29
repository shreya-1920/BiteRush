const express = require("express");

const router = express.Router();
const restaurantAuth = require("../middleware/restaurantAuth");
const {
  loginRestaurant,
  getCurrentRestaurant,
  getRestaurantProfile,
  updateRestaurantProfile,
} = require("../controllers/restaurantAuthController");

router.post("/login", loginRestaurant);
router.get("/me", restaurantAuth, getCurrentRestaurant);

module.exports = router;