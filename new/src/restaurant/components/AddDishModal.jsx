import { useState, useEffect } from "react";
import {
  FaTimes,
  FaCloudUploadAlt,
  FaCamera,
} from "react-icons/fa";
import { toast } from "react-toastify";
import "../styles/Restaurant-panel.css";

function AddDishModal({
  open,
  onClose,
  onSave,
  dishData,
}) {
  const initialState = {
    name: "",
    category: "",
    price: "",
    prepTime: "",
    description: "",
    veg: true,
    available: true,
    featured: false,
    image: null,
  };

  const [dish, setDish] = useState(initialState);
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!open) return;

    if (dishData) {
      setDish({
        ...initialState,
        ...dishData,
        veg: dishData.isVeg ?? dishData.veg ?? true,
        available:
          dishData.status
            ? dishData.status === "Available"
            : dishData.available ?? true,
      });

      setPreview(dishData.image || "");
    } else {
      setDish(initialState);
      setPreview("");
    }
  }, [dishData, open]);

  if (!open) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setDish((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setDish((prev) => ({
      ...prev,
      image: file,
    }));

    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !dish.name.trim() ||
      !dish.category ||
      !dish.price ||
      !dish.description.trim()
    ) {
      toast.warning("Please fill all required fields.");
      return;
    }

    try {
      await onSave({
        ...dish,
        price: Number(dish.price),
      });
      onClose();
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong"
      );
    }
  };

  return (
    <div className="adm-overlay">
      <div className="adm-modal">
        <div className="adm-header">
          <h2>
            {dishData ? "Edit Dish" : "Add New Dish"}
          </h2>

         <button
  type="button"
  className="adm-close"
  onClick={onClose}
>
            <FaTimes />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="adm-form"
        >
          {/* Image Upload */}
          <div className="adm-upload">
            <label
              htmlFor="dishImage"
              className="adm-image-box"
            >
              {preview ? (
                <>
                  <img
                    src={preview}
                    alt="preview"
                  />

                  <div className="adm-change-image">
                    <FaCamera />
                  </div>
                </>
              ) : (
                <div className="adm-upload-placeholder">
                  <FaCloudUploadAlt />
                  <p>Upload Dish Image</p>
                </div>
              )}
            </label>

            <input
              id="dishImage"
              type="file"
              accept="image/*"
              hidden
              onChange={handleImage}
            />
          </div>

          {/* Dish Name */}
          <div className="adm-group">
            <label>Dish Name *</label>

            <input
              type="text"
              name="name"
              value={dish.name}
              onChange={handleChange}
            />
          </div>

          {/* Category + Price */}
          <div className="adm-row">
            <div className="adm-group">
              <label>Category *</label>

              <select
                name="category"
                value={dish.category}
                onChange={handleChange}
              >
                <option value="">Select</option>
                <option>Pizza</option>
                <option>Burger</option>
                <option>Pasta</option>
                <option>Starter</option>
                <option>Dessert</option>
                <option>Drinks</option>
              </select>
            </div>

            <div className="adm-group">
              <label>Price *</label>

              <input
                type="number"
                min="1"
                name="price"
                value={dish.price}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Prep Time + Availability */}
          <div className="adm-row">
            <div className="adm-group">
              <label>Preparation Time</label>

              <input
                type="number"
                name="prepTime"
                min="1"
                value={dish.prepTime}
                onChange={handleChange}
              />
            </div>

            <div className="adm-group">
              <label>Availability</label>

              <select
                name="available"
                value={dish.available ? "true" : "false"}
                onChange={(e) =>
                  setDish((prev) => ({
                    ...prev,
                    available:
                      e.target.value === "true",
                  }))
                }
              >
                <option value="true">
                  Available
                </option>
                <option value="false">
                  Unavailable
                </option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="adm-group">
            <label>Description *</label>

            <textarea
              rows="4"
              name="description"
              value={dish.description}
              onChange={handleChange}
            />
          </div>

          {/* Checkboxes */}
          <div className="adm-checks">
            <label>
              <input
                type="checkbox"
                name="veg"
                checked={dish.veg}
                onChange={handleChange}
              />

              Veg Dish
            </label>

            <label>
              <input
                type="checkbox"
                name="featured"
                checked={dish.featured}
                onChange={handleChange}
              />

              Featured Dish
            </label>
          </div>

          {/* Buttons */}
          <div className="adm-buttons">
            <button
              type="button"
              className="adm-cancel"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="adm-save"
            >
              {dishData
                ? "Update Dish"
                : "Save Dish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddDishModal;