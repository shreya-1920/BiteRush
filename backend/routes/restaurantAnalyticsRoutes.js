const express = require("express");

const router = express.Router();

const restaurantAuth = require("../middleware/restaurantAuth");

const {
  getAnalytics,
} = require("../controllers/restaurantAnalyticsController");

router.get(
  "/analytics",
  restaurantAuth,
  getAnalytics
);

module.exports = router;