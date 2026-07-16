import Header from "../Components/Header";
import RestaurantsHero from "../Components/RestaurantsHero";
import FilterBar from "../Components/FilterBar";
import RestaurantCard from "../Components/RestaurantCard";
import Footer from "../Components/Footer";
import { getWishlist } from "../services/WishlistService";
import restaurants from "../data/restaurants";
import { useLocation } from "../context/LocationContext";

import { useState,useEffect } from "react";
function Restaurants() {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [sortBy, setSortBy] = useState("Relevance");
  const [searchTerm, setSearchTerm] = useState("");
  const { location } = useLocation();
  const currentCity = location?.split(",")[0].trim() || "";
const [wishlistIds, setWishlistIds] = useState([]);
const fetchWishlist = async () => {
    try {
        const res = await getWishlist();

        setWishlistIds(
            res.data.map(item => String(item.restaurantId))
        );

    } catch (err) {
        console.log(err);
    }
};

useEffect(() => {
    fetchWishlist();
}, []);
  let filteredRestaurants = [...restaurants];
  // Filter by city only if a city is selected

  if (
    currentCity !== "" &&
    currentCity !== "All Locations" &&
    currentCity !== "Detecting..."
  ) {
    filteredRestaurants = filteredRestaurants.filter(
      (restaurant) =>
        restaurant.city.toLowerCase() === currentCity.toLowerCase(),
    );
  }

if (searchTerm.trim() !== "") {
  filteredRestaurants = filteredRestaurants.filter(
    (restaurant) =>
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );
}

// Pure Veg
if (selectedFilters.includes("Pure Veg")) {
  filteredRestaurants = filteredRestaurants.filter(
    (restaurant) => restaurant.isVeg,
  );
}

// Non-Veg
if (selectedFilters.includes("Non-Veg")) {
  filteredRestaurants = filteredRestaurants.filter(
    (restaurant) => !restaurant.isVeg,
  );
}

// Fast Delivery
if (selectedFilters.includes("Fast Delivery")) {
  filteredRestaurants = filteredRestaurants.filter(
    (restaurant) => restaurant.fastDelivery,
  );
}

// Top Rated
if (selectedFilters.includes("Top Rated")) {
  filteredRestaurants = filteredRestaurants.filter(
    (restaurant) => restaurant.topRated,
  );
}

// Offers
if (selectedFilters.includes("Offers")) {
  filteredRestaurants = filteredRestaurants.filter(
    (restaurant) => restaurant.offer,
  );
}

// Near You
if (selectedFilters.includes("Near You")) {
  filteredRestaurants = filteredRestaurants.filter(
    (restaurant) => restaurant.nearYou,
  );
}
let finalRestaurants = [...filteredRestaurants];

switch (sortBy) {
  case "Rating":
    finalRestaurants.sort((a, b) => b.rating - a.rating);
    break;

  case "Delivery Time":
    finalRestaurants.sort((a, b) => a.time - b.time);
    break;

  case "Price":
    finalRestaurants.sort((a, b) => a.price - b.price);
    break;

  case "Relevance":
  default:
    break;
}
console.log(finalRestaurants);
console.log("All Restaurants:", restaurants);
console.log("Search:", searchTerm);
console.log("Selected Filters:", selectedFilters);
console.log("After Filtering:", filteredRestaurants);
console.log("Final:", finalRestaurants);
return (
  <>
    <Header />

    <main className="restaurants-page">
      <RestaurantsHero searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <FilterBar
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <section className="restaurants-section">
        <div className="container">
          <div className="restaurant-grid">
            {finalRestaurants.length > 0 ? (
              finalRestaurants.map((restaurant) => (
    <RestaurantCard
        key={restaurant.id}
        restaurant={restaurant}
        wishlistIds={wishlistIds}
        fetchWishlist={fetchWishlist}
    />
))
            ) : (
              <div className="no-restaurants">
                <h2>No restaurants found 🍽️</h2>

                <p>We don't have restaurants in {currentCity} yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>

    <Footer />
  </>
);
}
export default Restaurants;
