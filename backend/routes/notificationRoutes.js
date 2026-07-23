const express = require("express");
const router = express.Router();

const adminAuth = require("../middleware/adminAuth");

const {
  getNotifications,
  markAllRead,
} = require("../controllers/notificationController");

router.get("/", adminAuth, getNotifications);

router.patch("/read-all", adminAuth, markAllRead);

module.exports = router;