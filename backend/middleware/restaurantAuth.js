const jwt = require("jsonwebtoken");
const Restaurant = require("../models/Restaurant");

const restaurantAuth = async (req, res, next) => {
  try {
     console.log("Authorization Header:", req.headers.authorization);

    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const restaurant = await Restaurant.findById(decoded.id);

    if (!restaurant) {
      return res.status(401).json({
        success: false,
        message: "Restaurant not found.",
      });
    }

    req.restaurant = restaurant;

    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: "Invalid Token.",
    });
  }
};

module.exports = restaurantAuth;