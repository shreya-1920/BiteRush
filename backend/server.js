require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

// ==================== Import Routes ====================

const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const contactRoutes = require("./routes/contactRoutes");
const cartRoutes = require("./routes/cartRoutes");
const wishlistRoutes = require("./routes/wishlistRoutes");

const restaurantRoutes = require("./routes/restaurantRoutes");
const menuRoutes = require("./routes/MenuRoutes");
const orderRoutes = require("./routes/orderRoutes");
const customerRoutes = require("./routes/customerRoutes");

// Coupon Routes
const couponRoutes = require("./routes/couponRoutes"); // Admin
const customerCouponRoutes = require("./routes/customerCouponRoutes"); // Customer

// ==================== MongoDB ====================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected Successfully"))
  .catch((err) => console.log(err));

// ==================== Middleware ====================

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ==================== Root Route ====================
const messageRoutes = require("./routes/messageRoutes");
app.use("/api/admin/messages", messageRoutes);
app.get("/", (req, res) => {
  res.send("Backend Running");
});

// ==================== API Routes ====================

// Authentication
app.use("/api/auth", authRoutes);
const settingRoutes = require("./routes/settingRoutes");
app.use("/api/admin/settings", settingRoutes);
// Admin
const dashboardRoutes = require("./routes/dashboardRoutes");
app.use("/api/admin/dashboard", dashboardRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin/customers", customerRoutes);
app.use("/api/admin/coupons", couponRoutes);
const notificationRoutes = require("./routes/notificationRoutes");

app.use("/api/admin/notifications", notificationRoutes);
const searchRoutes = require("./routes/searchRoutes");
app.use("/api/admin/search", searchRoutes);
// Customer Coupons
app.use("/api/coupons", customerCouponRoutes);

// Contact
app.use("/api/contact", contactRoutes);

// Cart
app.use("/api/cart", cartRoutes);

// Wishlist
app.use("/api/wishlist", wishlistRoutes);

// Restaurants & Menu
app.use("/api/restaurants", restaurantRoutes);
app.use("/api/menu", menuRoutes);

// Orders
app.use("/api/orders", orderRoutes);

// ==================== Server ====================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});