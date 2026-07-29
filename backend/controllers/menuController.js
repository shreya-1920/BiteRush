const Menu = require("../models/Menu");
const cloudinary = require("../config/cloudinary");
const streamifier = require("streamifier");
// Get All Menu Items
const getMenus = async (req, res) => {
  try {
    const menus = await Menu.find().populate("restaurant", "name");

    res.status(200).json(menus);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Get Single Menu Item
const getMenu = async (req, res) => {
  try {
    const menu = await Menu.findById(req.params.id).populate(
      "restaurant",
      "name"
    );

    if (!menu) {
      return res.status(404).json({
        message: "Menu item not found",
      });
    }

    res.json(menu);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Create Menu Item
const addMenu = async (req, res) => {
  try {
    const menu = new Menu(req.body);

    await menu.save();

    res.status(201).json(menu);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Update Menu Item
const updateMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!menu) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found",
      });
    }

    res.status(200).json({
      success: true,
      menu,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const getRestaurantMenu = async (req, res) => {
  try {
    const menu = await Menu.find({
      restaurant: req.params.restaurantId,
    });

    res.json(menu);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
// Delete Menu Item
const deleteMenu = async (req, res) => {
  try {
    const menu = await Menu.findByIdAndDelete(req.params.id);

    if (!menu) {
      return res.status(404).json({
        message: "Menu item not found",
      });
    }

    res.json({
      message: "Menu item deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};


const getMyMenu = async (req, res) => {
  try {
    const menu = await Menu.find({
      restaurant: req.restaurant._id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      menu,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const addMyDish = async (req, res) => {
  try {
     console.log("🔥 addMyDish controller is running");
    console.log("BODY:", req.body);
console.log("FILE:", req.file);
    let imageUrl = "";

    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "biterush-menu",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

      imageUrl = result.secure_url;
    }

    const dish = await Menu.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      isVeg: req.body.isVeg,
      status: req.body.status,
      restaurant: req.restaurant._id,
      image: imageUrl,
    });

    res.status(201).json({
      success: true,
      message: "Dish added successfully",
      dish,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateMyDish = async (req, res) => {
  try {
    const dish = await Menu.findOne({
      _id: req.params.id,
      restaurant: req.restaurant._id,
    });

    if (!dish) {
      return res.status(404).json({
        success: false,
        message: "Dish not found",
      });
    }

    // Update text fields
    dish.name = req.body.name;
    dish.description = req.body.description;
    dish.category = req.body.category;
    dish.price = req.body.price;
    dish.isVeg = req.body.isVeg;
    dish.status = req.body.status;

    // Upload new image if selected
    if (req.file) {
      const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "biterush-menu",
          },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

      dish.image = result.secure_url;
    }

    await dish.save();

    res.status(200).json({
      success: true,
      message: "Dish updated successfully",
      dish,
    });

  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// Delete Logged-in Restaurant Dish
const deleteMyDish = async (req, res) => {
  try {
    const dish = await Menu.findOneAndDelete({
      _id: req.params.id,
      restaurant: req.restaurant._id,
    });

    if (!dish) {
      return res.status(404).json({
        success: false,
        message: "Dish not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Dish deleted successfully",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const toggleDishStatus = async (req, res) => {
  try {
    const dish = await Menu.findOne({
      _id: req.params.id,
      restaurant: req.restaurant._id,
    });

    if (!dish) {
      return res.status(404).json({
        success: false,
        message: "Dish not found",
      });
    }

    dish.status =
      dish.status === "Available"
        ? "Unavailable"
        : "Available";

    await dish.save();

    res.status(200).json({
      success: true,
      message: "Dish status updated",
      dish,
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
module.exports = {
  // Existing APIs
  getMenus,
  getMenu,
  getRestaurantMenu,
  addMenu,
  updateMenu,
  deleteMenu,

  // Restaurant Panel APIs
  getMyMenu,
  addMyDish,
  updateMyDish,
  deleteMyDish,
  toggleDishStatus,
};