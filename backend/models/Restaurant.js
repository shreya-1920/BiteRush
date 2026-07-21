const mongoose = require("mongoose");

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    cuisine: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      default: 0,
    },

    reviews: {
      type: Number,
      default: 0,
    },

    time: String,
    delivery: String,
    price: String,
    offer: String,

    isVeg: {
      type: Boolean,
      default: false,
    },

    fastDelivery: {
      type: Boolean,
      default: false,
    },

    topRated: {
      type: Boolean,
      default: false,
    },

    nearYou: {
      type: Boolean,
      default: false,
    },

    banner: String,
    logo: String,

    gallery: [String],

    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);