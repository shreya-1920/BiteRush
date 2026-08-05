import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  FaStore,
  FaTruck,
  FaStar,
  FaImage,
  FaTags,
} from "react-icons/fa";
import "../../Styles/RestaurantForm.css";
import {
  addRestaurant,
  updateRestaurant,
} from "../../Services/RestaurantService";

function RestaurantForm({
  mode,
  restaurant,
  onClose,
  fetchRestaurants,
}) {

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    category: "",
    cuisine: "",
    price: "",
    delivery: "",
    time: "",
    offer: "",
    banner: "",
    logo: "",
    rating: 4.5,
    reviews: 0,
    status: "Active",
    isVeg: false,
    fastDelivery: false,
    topRated: false,
    nearYou: false,
  });

  useEffect(() => {
    if (mode === "edit" && restaurant) {
      setFormData({
        name: restaurant.name || "",
        city: restaurant.city || "",
        category: restaurant.category || "",
        cuisine: restaurant.cuisine || "",
        price: restaurant.price || "",
        delivery: restaurant.delivery || "",
        time: restaurant.time || "",
        offer: restaurant.offer || "",
        banner: restaurant.banner || "",
        logo: restaurant.logo || "",
        rating: restaurant.rating || 4.5,
        reviews: restaurant.reviews || 0,
        status: restaurant.status || "Active",
        isVeg: restaurant.isVeg || false,
        fastDelivery: restaurant.fastDelivery || false,
        topRated: restaurant.topRated || false,
        nearYou: restaurant.nearYou || false,
      });
    }
  }, [mode, restaurant]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.city ||
      !formData.category ||
      !formData.cuisine
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      if (mode === "edit") {
        await updateRestaurant(restaurant._id, formData);
      } else {
        await addRestaurant(formData);
      }

      await fetchRestaurants();

      toast.success(
        mode === "edit"
          ? "Restaurant updated successfully!"
          : "Restaurant added successfully!"
      );

      onClose();
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>

      {/* ================= BASIC INFORMATION ================= */}

      <div className="rf-form-section">

        <div className="rf-section-header">

          <div className="rf-section-title">

            <FaStore className="rf-section-icon" />

            <h3>Basic Information</h3>

          </div>

        </div>
              <div className="rf-form-grid">

        <div className="rf-form-group">
          <label>Restaurant Name *</label>

          <input
            type="text"
            name="name"
            placeholder="Enter restaurant name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="rf-form-group">
          <label>City *</label>

          <input
            type="text"
            name="city"
            placeholder="Enter city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>

        <div className="rf-form-group">
          <label>Category *</label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
<option value="Fast Food">Fast Food</option>
<option value="Pizza">Pizza</option>
<option value="Burger">Burger</option>
<option value="Cafe">Cafe</option>
<option value="Bakery">Bakery</option>
<option value="Desserts">Desserts</option>
<option value="Chinese">Chinese</option>
<option value="North Indian">North Indian</option>
<option value="Seafood">Seafood</option>
<option value="South Indian">South Indian</option>
<option value="Italian">Italian</option>
<option value="Mexican">Mexican</option>
<option value="Beverages">Beverages</option>
</select>
        </div>

        <div className="rf-form-group">
          <label>Cuisine *</label>

          <select
            name="cuisine"
            value={formData.cuisine}
            onChange={handleChange}
          >
            <option value="">Select Cuisine</option>
            <option>Indian</option>
            <option>Chinese</option>
            <option>Italian</option>
            <option>Mexican</option>
            <option>Thai</option>
          </select>
        </div>

      </div>

    </div>

    {/* ================= DELIVERY ================= */}

    <div className="rf-form-section">

      <div className="rf-section-header">

        <div className="rf-section-title">

          <FaTruck className="rf-section-icon" />

          <h3>Delivery Information</h3>

        </div>

      </div>

      <div className="rf-orm-grid">

        <div className="rf-form-group">

          <label>Price Range</label>

          <select
            name="price"
            value={formData.price}
            onChange={handleChange}
          >
            <option value="">Select Price</option>
            <option>₹</option>
            <option>₹₹</option>
            <option>₹₹₹</option>
            <option>₹₹₹₹</option>
          </select>

        </div>

        <div className="rf-form-group">

          <label>Delivery Fee</label>

          <input
            type="text"
            name="delivery"
            placeholder="Free Delivery"
            value={formData.delivery}
            onChange={handleChange}
          />

        </div>
                <div className="rf-form-group">

          <label>Delivery Time</label>

          <select
            name="time"
            value={formData.time}
            onChange={handleChange}
          >
            <option value="">Select Time</option>
            <option>15-20 mins</option>
            <option>20-30 mins</option>
            <option>30-40 mins</option>
            <option>40-60 mins</option>
          </select>

        </div>

        <div className="rf-form-group">

          <label>Offer</label>

          <input
            type="text"
            name="offer"
            placeholder="Flat 20% OFF"
            value={formData.offer}
            onChange={handleChange}
          />

        </div>

      </div>

    </div>

    {/* ================= RESTAURANT DETAILS ================= */}

    <div className="rf-form-section">

      <div className="rf-section-header">

        <div className="rf-section-title">

          <FaStar className="rf-section-icon" />

          <h3>Restaurant Details</h3>

        </div>

      </div>

      <div className="rf-form-grid">

        <div className="rf-form-group">

          <label>Rating</label>

          <input
            type="number"
            step="0.1"
            min="0"
            max="5"
            name="rating"
            placeholder="4.5"
            value={formData.rating}
            onChange={handleChange}
          />

        </div>

        <div className="rf-form-group">

          <label>Reviews</label>

          <input
            type="number"
            min="0"
            name="reviews"
            placeholder="250"
            value={formData.reviews}
            onChange={handleChange}
          />

        </div>

        <div className="rf-form-group">

          <label>Status</label>

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

        </div>

      </div>

    </div>

    {/* ================= IMAGES ================= */}

    <div className="rf-form-section">

      <div className="rf-section-header">

        <div className="rf-section-title">

          <FaImage className="rf-section-icon" />

          <h3>Restaurant Images</h3>

        </div>

      </div>

      <div className="rf-form-grid">

        <div className="rf-form-group">

          <label>Banner URL</label>

          <input
            type="text"
            name="banner"
            placeholder="Paste banner image URL"
            value={formData.banner}
            onChange={handleChange}
          />

        </div>
                <div className="rf-form-group">

          <label>Logo URL</label>

          <input
            type="text"
            name="logo"
            placeholder="Paste logo image URL"
            value={formData.logo}
            onChange={handleChange}
          />

        </div>

      </div>

    </div>

    {/* ================= FEATURES ================= */}

    <div className="rf-form-section">

      <div className="rf-section-header">

        <div className="rf-section-title">

          <FaTags className="rf-section-icon" />

          <h3>Restaurant Features</h3>

        </div>

      </div>

      <div className="rf-feature-grid">

        <label className="rf-feature-card">

          <input
            type="checkbox"
            name="isVeg"
            checked={formData.isVeg}
            onChange={handleChange}
          />

          <span>🥗 Veg Only</span>

        </label>

        <label className="rf-feature-card">

          <input
            type="checkbox"
            name="fastDelivery"
            checked={formData.fastDelivery}
            onChange={handleChange}
          />

          <span>⚡ Fast Delivery</span>

        </label>

        <label className="rf-feature-card">

          <input
            type="checkbox"
            name="topRated"
            checked={formData.topRated}
            onChange={handleChange}
          />

          <span>⭐ Top Rated</span>

        </label>

        <label className="rf-feature-card">

          <input
            type="checkbox"
            name="nearYou"
            checked={formData.nearYou}
            onChange={handleChange}
          />

          <span>📍 Near You</span>

        </label>

      </div>

    </div>

    {/* ================= BUTTONS ================= */}

    <div className="rf-form-buttons">

      <button
        type="button"
        className="cancel-btn"
        onClick={onClose}
      >
        Cancel
      </button>

      <button
        type="submit"
        className="br-save-btn"
      >
        {mode === "edit"
          ? "Update Restaurant"
          : "Add Restaurant"}
      </button>

    </div>

  </form>
);

}

export default RestaurantForm;