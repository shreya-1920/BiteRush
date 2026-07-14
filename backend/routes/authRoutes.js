const express = require("express");
const router = express.Router();

const {
  register,
  login,
  getProfile,
  logout,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

// Test Route
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Auth routes working",
  });
});

// Auth Routes
router.post("/register", register);
router.post("/login", login);

router.get("/profile", authMiddleware, getProfile);

router.get("/logout", logout);

router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword/:token", resetPassword);

module.exports = router;