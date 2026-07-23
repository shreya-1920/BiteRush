const Order = require("../models/Order");
const Notification = require("../models/Notification");
/* ==========================
   Create Order
========================== */

exports.createOrder = async (req, res) => {
  try {
    const {
      restaurant,
      name,
      phone,
      address,
      paymentMethod,
      items,
      subtotal,
      deliveryFee,
      discount,
      total,
    } = req.body;

    const order = await Order.create({
  user: req.user.userId,
  restaurant,
  name,
  phone,
  address,
  paymentMethod,
  items,
  subtotal,
  deliveryFee,
  discount,
  total,
});
await Notification.create({
  title: "New Order",
  message: `${name} placed a new order.`,
  type: "order",
});
    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================
   Get Logged-in User Orders
========================== */

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.userId })
      .populate("restaurant", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================
   Admin - Get All Orders
========================== */

exports.getAllOrders = async (req, res) => {
    
  console.log("INSIDE GET ALL ORDERS");

  
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("restaurant", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================
   Get Single Order
========================== */

exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email")
      .populate("restaurant", "name");

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================
   Update Order Status
========================== */

exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    order.status = status;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order status updated",
      order,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ==========================
   Delete Order
========================== */

exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    await order.deleteOne();

    res.status(200).json({
      success: true,
      message: "Order deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};