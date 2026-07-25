require("dotenv").config();

const mongoose = require("mongoose");
const axios = require("axios");
const { v2: cloudinary } = require("cloudinary");

const Restaurant = require("../models/Restaurant");
const Menu = require("../models/Menu");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

mongoose.connect(process.env.MONGO_URI);

async function uploadImage(url, folder) {
  if (!url || url.includes("res.cloudinary.com")) return url;

  try {
    // Check URL is reachable
    await axios.get(url);

    const result = await cloudinary.uploader.upload(url, {
      folder,
    });

    console.log("✅ Uploaded:", result.secure_url);

    return result.secure_url;
  } catch (err) {
    console.log("❌ Failed:", url);
    return url;
  }
}

async function migrateRestaurants() {
  const restaurants = await Restaurant.find();

  for (const restaurant of restaurants) {
    console.log(`\n🍽 ${restaurant.name}`);

    restaurant.banner = await uploadImage(
      restaurant.banner,
      "biterush/restaurants/banner"
    );

    restaurant.logo = await uploadImage(
      restaurant.logo,
      "biterush/restaurants/logo"
    );

    if (restaurant.gallery && restaurant.gallery.length) {
      const gallery = [];

      for (const image of restaurant.gallery) {
        gallery.push(
          await uploadImage(image, "biterush/restaurants/gallery")
        );
      }

      restaurant.gallery = gallery;
    }

    await restaurant.save();
  }

  console.log("\n✅ Restaurants migrated");
}

async function migrateMenu() {
  const menuItems = await Menu.find();

  for (const item of menuItems) {
    item.image = await uploadImage(
      item.image,
      "biterush/menu"
    );

    await item.save();
  }

  console.log("✅ Menu migrated");
}

async function start() {
  try {
    await migrateRestaurants();
    await migrateMenu();

    console.log("\n🎉 Migration Complete");

    mongoose.disconnect();
  } catch (err) {
    console.error(err);
    mongoose.disconnect();
  }
}

start();