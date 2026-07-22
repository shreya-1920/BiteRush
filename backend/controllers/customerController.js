const User = require("../models/User");
const Order = require("../models/Order");
// Get All Customers
const getAllCustomers = async (req, res) => {
  try {
    const customers = await User.find().select("-password");

    const data = await Promise.all(
      customers.map(async (customer) => {
        const totalOrders = await Order.countDocuments({
          user: customer._id,
        });

        return {
          ...customer.toObject(),
          totalOrders,
        };
      })
    );

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get Single Customer
const getCustomerById = async (req, res) => {
  try {
    const customer = await User.findById(req.params.id).select("-password");

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Block / Unblock Customer
const toggleBlockCustomer = async (req, res) => {
  try {
    const customer = await User.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    customer.isBlocked = !customer.isBlocked;

    await customer.save();

    res.status(200).json({
      message: customer.isBlocked
        ? "Customer blocked successfully"
        : "Customer unblocked successfully",
      customer,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Delete Customer
const deleteCustomer = async (req, res) => {
  try {
    const customer = await User.findById(req.params.id);

    if (!customer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    await customer.deleteOne();

    res.status(200).json({
      message: "Customer deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  toggleBlockCustomer,
  deleteCustomer,
};