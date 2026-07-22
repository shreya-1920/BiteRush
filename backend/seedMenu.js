const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Restaurant = require("./models/Restaurant");
const Menu = require("./models/Menu");

dotenv.config();

const menuData = require("./menuData"); // <-- change path if needed

const seedMenus = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

    // Delete old menu items
    await Menu.deleteMany();

    // Get all restaurants
    const restaurants = await Restaurant.find();

    // Create mapping
    const restaurantMap = {};

    restaurants.forEach((restaurant) => {
      restaurantMap[restaurant.name] = restaurant._id;
    });

    // Mapping between frontend ids and restaurant names
    const idToRestaurant = {
      1: "The Smokehouse Grill",
      2: "Napoli Express",
      3: "Sakura Kitchen",
      4: "Spice Junction",
      5: "Dragon Bowl",
      6: "Taco Fiesta",
      7: "Ocean Catch",
      8: "Green Bowl",
      9: "Paris Café",
      10: "Royal Biryani",
      11: "Burger Republic",
      12: "Bella Pasta",
    };

    const menus = [];

    for (const key in menuData) {
      const restaurantName = idToRestaurant[key];
      const restaurantId = restaurantMap[restaurantName];

      if (!restaurantId) {
        console.log(`❌ Restaurant not found: ${restaurantName}`);
        continue;
      }

      menuData[key].forEach((item) => {
        menus.push({
          restaurant: restaurantId,
          name: item.name,
          description: item.description,
          category: item.category || "Main Course",
          price: item.price,
          image: item.image,
          isVeg:
            item.isVeg !== undefined
              ? item.isVeg
              : item.veg !== undefined
              ? item.veg
              : false,
          status: "Available",
        });
      });
    }

    await Menu.insertMany(menus);

    console.log(`🎉 ${menus.length} Menu Items Added Successfully`);

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedMenus();