const express = require("express");

const router = express.Router();

const {
  getMenus,
  getMenu,
  getRestaurantMenu,
  addMenu,
  updateMenu,
  deleteMenu,
} = require("../controllers/MenuController");

router.get("/", getMenus);
router.get("/restaurant/:restaurantId", getRestaurantMenu);
router.get("/:id", getMenu);

router.post("/", addMenu);

router.put("/:id", updateMenu);

router.delete("/:id", deleteMenu);

module.exports = router;