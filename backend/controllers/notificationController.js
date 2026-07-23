const Notification = require("../models/Notification");

// Get Notifications
exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      success: true,
      notifications,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Mark All Read
exports.markAllRead = async (req, res) => {
  try {
    await Notification.updateMany({}, { read: true });

    res.status(200).json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};