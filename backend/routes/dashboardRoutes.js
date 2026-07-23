const express = require("express");
const router = express.Router();

const adminAuth = require("../middleware/adminAuth");

const {
  getDashboardStats,
} = require("../controllers/dashboardController");

router.get("/", adminAuth, getDashboardStats);

module.exports = router;