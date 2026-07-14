const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    restaurantId: {
        type: String,
        required: true,
    },

    restaurantName: {
        type: String,
        required: true,
    },

    image: {
        type: String,
        required: true,
    },

    category: String,

    rating: Number,

    deliveryTime: String,

}, {
    timestamps: true,
});

module.exports = mongoose.model("Wishlist", wishlistSchema);