const jwt = require("jsonwebtoken");

const generateRestaurantToken = (id) => {
  return jwt.sign(
    {
      id,
      role: "restaurant",
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};

module.exports = generateRestaurantToken;