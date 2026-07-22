import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import {
  addMenu,
  updateMenu,
} from "../../Services/MenuService";

import { getRestaurants } from "../../Services/RestaurantService";

function MenuForm({ mode, item, onClose, onSuccess }) {
  const [restaurants, setRestaurants] = useState([]);

  const [formData, setFormData] = useState({
    restaurant: "",
    name: "",
    description: "",
    category: "",
    price: "",
    image: "",
    isVeg: true,
    status: "Available",
  });



  useEffect(() => {
    if (mode === "edit" && item) {
      setFormData({
        restaurant: item.restaurant?._id || item.restaurant || "",
        name: item.name || "",
        description: item.description || "",
        category: item.category || "",
        price: item.price || "",
        image: item.image || "",
        isVeg: item.isVeg ?? true,
        status: item.status || "Available",
      });
    } else {
      setFormData({
        restaurant: "",
        name: "",
        description: "",
        category: "",
        price: "",
        image: "",
        isVeg: true,
        status: "Available",
      });
    }
  }, [mode, item]);

  const loadRestaurants = async () => {
    try {
      const res = await getRestaurants();
      setRestaurants(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load restaurants");
    }
  };
  useEffect(() => {
    loadRestaurants();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (mode === "edit") {
        await updateMenu(item._id, formData);
        toast.success("Menu item updated successfully!");
      } else {
        await addMenu(formData);
        toast.success("Menu item added successfully!");
      }

      if (onSuccess) onSuccess();

      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="form-grid">

        <div className="form-group">
          <label>Restaurant</label>

          <select
            name="restaurant"
            value={formData.restaurant}
            onChange={handleChange}
            required
          >
            <option value="">Select Restaurant</option>

            {restaurants.map((restaurant) => (
              <option
                key={restaurant._id}
                value={restaurant._id}
              >
                {restaurant.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Item Name</label>

          <input
            type="text"
            name="name"
            placeholder="Enter item name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>

          <textarea
            name="description"
            rows="3"
            placeholder="Enter description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>

            <option>Burger</option>
            <option>Pizza</option>
            <option>Pasta</option>
            <option>Chinese</option>
            <option>North Indian</option>
            <option>South Indian</option>
            <option>Desserts</option>
            <option>Beverages</option>
            <option>Seafood</option>
          </select>
        </div>

        <div className="form-group">
          <label>Price</label>

          <input
            type="number"
            name="price"
            placeholder="Enter price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Image URL</label>

          <input
            type="text"
            name="image"
            placeholder="Paste image URL"
            value={formData.image}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Food Type</label>

          <select
            value={formData.isVeg}
            onChange={(e) =>
              setFormData({
                ...formData,
                isVeg: e.target.value === "true",
              })
            }
          >
            <option value="true">Veg</option>
            <option value="false">Non Veg</option>
          </select>
        </div>

        <div className="form-group">
          <label>Status</label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Available">Available</option>
            <option value="Unavailable">Unavailable</option>
          </select>
        </div>
      </div>

      <div className="form-buttons">
        <button
          type="button"
          className="br-cancel-btn"
          onClick={onClose}
        >
          Cancel
        </button>

        <button
          type="submit"
          className="br-save-btn"
        >
          {mode === "edit"
            ? "Update Item"
            : "Save Item"}
        </button>
      </div>
    </form>
  );
}

export default MenuForm;