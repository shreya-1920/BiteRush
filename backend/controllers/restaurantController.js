const Restaurant = require("../models/Restaurant");
const Notification = require("../models/Notification");
// Get All Restaurants
const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();

    res.status(200).json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Restaurant
const getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    res.json(restaurant);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Create Restaurant
const createRestaurant = async (req, res) => {
  try {
    const restaurant = new Restaurant(req.body);

    await restaurant.save();

    // Create Notification
    await Notification.create({
      title: "Restaurant Added",
      message: `${restaurant.name} has been added.`,
      type: "restaurant",
    });

    res.status(201).json(restaurant);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Update Restaurant
const updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Delete Restaurant
const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    res.json({
      message: "Restaurant deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};