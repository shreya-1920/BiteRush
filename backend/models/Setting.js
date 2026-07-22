const mongoose = require("mongoose");

const settingSchema = new mongoose.Schema(
  {
    restaurantName: {
      type: String,
      default: "BiteRush",
    },

    email: {
      type: String,
      default: "",
    },

    phone: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    deliveryFee: {
      type: Number,
      default: 40,
    },

    freeDeliveryAbove: {
      type: Number,
      default: 500,
    },

    gst: {
      type: Number,
      default: 5,
    },

    currency: {
      type: String,
      default: "₹",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Setting", settingSchema);