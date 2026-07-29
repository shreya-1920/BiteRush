const Restaurant = require("../models/Restaurant");
const Notification = require("../models/Notification");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
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
// ================================
// Restaurant Panel
// ================================

// Get Logged-in Restaurant Profile
const getRestaurantProfile = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.restaurant._id).select("-password");

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

// Update Logged-in Restaurant Profile

const updateRestaurantProfile = async (req, res) => {
  try {
    console.log("===== UPDATE PROFILE =====");
console.log("BODY:", req.body);
console.log("FILES:", req.files);

if (req.files?.logo) {
  console.log("Logo file:", req.files.logo[0]);
}

if (req.files?.banner) {
  console.log("Banner file:", req.files.banner[0]);
}

    const restaurant = await Restaurant.findById(req.restaurant._id);

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }
// Upload logo
if (req.files?.logo) {
  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "biterush-restaurant/logo",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(req.files.logo[0].buffer).pipe(stream);
  });

  restaurant.logo = result.secure_url;
}

// Upload banner
if (req.files?.banner) {
  const result = await new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "biterush-restaurant/banner",
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(req.files.banner[0].buffer).pipe(stream);
  });

  restaurant.banner = result.secure_url;
}
    const fields = [
      "ownerName",
      "phone",
      "address",
      "website",
      "instagram",
      "facebook",
      "description",
      "opening",
      "closing",
      
      "isOpen",
    ];

    fields.forEach((field) => {
      if (req.body[field] !== undefined) {
        restaurant[field] = req.body[field];
      }
    });

    const updatedRestaurant = await restaurant.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      restaurant: updatedRestaurant,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
module.exports = {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,

  getRestaurantProfile,
  updateRestaurantProfile,
};