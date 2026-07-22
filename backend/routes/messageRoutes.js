const express = require("express");
const router = express.Router();

const {
  getAllMessages,
  getMessageById,
  deleteMessage,
} = require("../controllers/contactController");

const adminAuth = require("../middleware/adminAuth");

router.get("/", adminAuth, getAllMessages);

router.get("/:id", adminAuth, getMessageById);

router.delete("/:id", adminAuth, deleteMessage);

module.exports = router;