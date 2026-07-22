const express = require("express");
const router = express.Router();

const {
  getAllCustomers,
  getCustomerById,
  toggleBlockCustomer,
  deleteCustomer,
} = require("../controllers/customerController");

const adminAuth = require("../middleware/adminAuth");

// Get All Customers
router.get("/", adminAuth, getAllCustomers);

// Get Single Customer
router.get("/:id", adminAuth, getCustomerById);

// Block / Unblock Customer
router.patch("/:id/block", adminAuth, toggleBlockCustomer);

// Delete Customer
router.delete("/:id", adminAuth, deleteCustomer);

module.exports = router;