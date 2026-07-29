const express = require("express");

const router = express.Router();

const restaurantAuth = require("../middleware/restaurantAuth");

const {
  getDashboard,
} = require("../controllers/restaurantDashboardController");

router.get("/dashboard", restaurantAuth, getDashboard);

module.exports = router;