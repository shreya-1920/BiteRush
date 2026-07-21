require("dotenv").config();

const mongoose = require("mongoose");
const Restaurant = require("./models/Restaurant");

// Copy the array from src/data/restaurants.js
const restaurants = require("./restaurantsData"); // we'll create this next

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB Connected");

    // Remove old restaurants
    await Restaurant.deleteMany();

    // Remove the frontend id field before inserting
    const data = restaurants.map(({ id, ...rest }) => rest);

    await Restaurant.insertMany(data);

    console.log(`${data.length} restaurants inserted successfully`);

    process.exit();
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });