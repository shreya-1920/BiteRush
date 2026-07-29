const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const restaurantAuth = require("../middleware/restaurantAuth");

const {
  getRestaurantProfile,
  updateRestaurantProfile,
} = require("../controllers/restaurantController");

router.get("/profile", restaurantAuth, getRestaurantProfile);

router.put(
  "/profile",
  restaurantAuth,
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "banner", maxCount: 1 },
    { name: "gallery", maxCount: 10 },
  ]),
  updateRestaurantProfile
);
module.exports = router;