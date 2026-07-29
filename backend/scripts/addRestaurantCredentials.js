const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

const Restaurant = require("../models/Restaurant");

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");

    const restaurants = await Restaurant.find();

    for (const restaurant of restaurants) {
      // Skip if credentials already exist
      if (restaurant.email) continue;

      const email =
        restaurant.name
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "") + "@biterush.com";

      const hashedPassword = await bcrypt.hash("Restaurant@123", 10);

      restaurant.ownerName = restaurant.name + " Owner";
      restaurant.email = email;
      restaurant.password = hashedPassword;
      restaurant.phone = "";
      restaurant.address = "";
      restaurant.website = "";
      restaurant.instagram = "";
      restaurant.facebook = "";
      restaurant.description = "";
      restaurant.opening = "09:00 AM";
      restaurant.closing = "10:00 PM";
      restaurant.role = "restaurant";
      restaurant.isOpen = true;

      await restaurant.save();

      console.log(`Updated: ${restaurant.name}`);
    }

    console.log("All restaurants updated successfully ✅");

    process.exit();
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });