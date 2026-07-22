const jwt = require("jsonwebtoken");

const adminAuth = (req, res, next) => {
  try {
    console.log("=== ADMIN AUTH ===");

    const authHeader = req.headers.authorization;

    console.log("Authorization:", authHeader);

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Decoded Token:", decoded);

    req.admin = decoded;

    next();
  } catch (err) {
    console.log("Admin Auth Error:", err.message);

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

module.exports = adminAuth;