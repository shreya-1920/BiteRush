import { useState } from "react";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaLeaf,
  FaDrumstickBite,
} from "react-icons/fa";

import "../styles/Restaurant-panel.css";
import AddDishModal from "../components/AddDishModal";
function RestaurantMenu() {
  const [category, setCategory] = useState("All");
const [showModal, setShowModal] = useState(false);

const [search, setSearch] = useState("");
  const [dishes, setDishes] = useState([
  {
    id: 1,
    name: "Farmhouse Pizza",
    category: "Pizza",
    price: 320,
    rating: 4.8,
    available: true,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
    veg: true,
  },
  {
    id: 2,
    name: "Cheese Burger",
    category: "Burger",
    price: 180,
    rating: 4.6,
    available: true,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    veg: false,
  },
  {
    id: 3,
    name: "White Sauce Pasta",
    category: "Pasta",
    price: 240,
    rating: 4.7,
    available: false,
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400",
    veg: true,
  },
  {
    id: 4,
    name: "Paneer Tikka",
    category: "Starter",
    price: 260,
    rating: 4.9,
    available: true,
    image:
      "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400",
    veg: true,
  },
]);
const filteredDishes = dishes.filter((dish) => {
  const matchCategory =
    category === "All" || dish.category === category;

  const matchSearch = dish.name
    .toLowerCase()
    .includes(search.toLowerCase());

  return matchCategory && matchSearch;
});

  return (
    <div className="rm-page">

      {/* Header */}

      <div className="rm-header">

        <div>

          <h1>Menu Management</h1>

          <p>Manage your dishes and pricing.</p>

        </div>

       <button
    className="rm-add-btn"
    onClick={() => setShowModal(true)}
>
    <FaPlus />
    Add New Dish
</button>

      </div>

      {/* Toolbar */}

      <div className="rm-toolbar">

        <div className="rm-search">

          <FaSearch />

         <input
    type="text"
    placeholder="Search dishes..."
    value={search}
    onChange={(e)=>setSearch(e.target.value)}
/>

        </div>

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >

          <option>All</option>
          <option>Pizza</option>
          <option>Burger</option>
          <option>Pasta</option>
          <option>Starter</option>

        </select>

      </div>

      {/* Cards */}

      <div className="rm-grid">

        {filteredDishes.map((dish) => (

          <div
            key={dish.id}
            className="rm-card"
          >

            <img
              src={dish.image}
              alt={dish.name}
            />

            <div className="rm-card-body">

              <div className="rm-top">

                <h3>{dish.name}</h3>

                {dish.veg ? (
                  <FaLeaf className="veg" />
                ) : (
                  <FaDrumstickBite className="nonveg" />
                )}

              </div>

              <span className="rm-category">
                {dish.category}
              </span>

              <div className="rm-price">

                ₹{dish.price}

                <span>⭐ {dish.rating}</span>

              </div>

              <div className="rm-status">

                <span
                  className={
                    dish.available
                      ? "available"
                      : "unavailable"
                  }
                >
                  {dish.available
                    ? "Available"
                    : "Unavailable"}
                </span>

              </div>

             <div className="rm-actions">

    <button className="edit-btn">
        <FaEdit />
    </button>

    <button className="delete-btn">
        <FaTrash />
    </button>

</div>

            </div>

          </div>

        ))}
<AddDishModal
    open={showModal}
    onClose={() => setShowModal(false)}
/>
      </div>

    </div>
  );
}

export default RestaurantMenu;