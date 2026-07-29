const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const restaurantAuth = require("../middleware/restaurantAuth");

const {
  getMyMenu,
  addMyDish,
  updateMyDish,
  deleteMyDish,
  toggleDishStatus,
} = require("../controllers/menuController");

// Get logged-in restaurant menu
router.get("/menu", restaurantAuth, getMyMenu);

// Add new dish
router.post(
  "/menu",
  restaurantAuth,
  upload.single("image"),
  addMyDish
);

// Update dish
router.put(
  "/menu/:id",
  restaurantAuth,
  upload.single("image"),
  updateMyDish
);

// Delete dish
router.delete("/menu/:id", restaurantAuth, deleteMyDish);

// Toggle Available / Unavailable
router.patch("/menu/:id/status", restaurantAuth, toggleDishStatus);

module.exports = router;