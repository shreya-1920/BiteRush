const Menu = require("../models/Menu");

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

module.exports = {
  getMenus,
  getMenu,
  getRestaurantMenu,
  addMenu,
  updateMenu,
  deleteMenu,
};