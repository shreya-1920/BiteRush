const express = require("express");

const router = express.Router();

const {
  loginAdmin,
  getAdminProfile,
  logoutAdmin,
} = require("../controllers/adminController");

const adminAuth = require("../middleware/adminAuth");

router.post("/login", loginAdmin);

router.get("/profile", adminAuth, getAdminProfile);

router.get("/logout", logoutAdmin);

module.exports = router;