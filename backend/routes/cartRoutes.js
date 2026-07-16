const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

const {
  getCart,
  addToCart,
  updateCart,
  removeCartItem,
  clearCart,
} = require("../controllers/cartController");
router.get("/", authMiddleware, getCart);

router.post("/", authMiddleware, addToCart);

router.put("/:id", authMiddleware, updateCart);

router.delete("/:id", authMiddleware, removeCartItem);

router.delete("/", authMiddleware, clearCart);

module.exports = router;