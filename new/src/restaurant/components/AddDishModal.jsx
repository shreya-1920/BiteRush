import { useState } from "react";
import { FaTimes, FaCloudUploadAlt } from "react-icons/fa";
import "../styles/Restaurant-panel.css";

function AddDishModal({ open, onClose }) {
  const [dish, setDish] = useState({
    name: "",
    category: "",
    price: "",
    prepTime: "",
    description: "",
    veg: true,
    available: true,
    featured: false,
    image: null,
  });

  const [preview, setPreview] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(dish);

    onClose();
  };

  return (
    <div className="adm-overlay">

      <div className="adm-modal">

        <div className="adm-header">

          <h2>Add New Dish</h2>

          <button
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

          <div className="adm-upload">

            <label htmlFor="dishImage">

              {preview ? (

                <img
                  src={preview}
                  alt="preview"
                />

              ) : (

                <>

                  <FaCloudUploadAlt />

                  <p>Upload Dish Image</p>

                </>

              )}

            </label>

            <input
              id="dishImage"
              type="file"
              accept="image/*"
              onChange={handleImage}
              hidden
            />

          </div>

          <div className="adm-group">

            <label>Dish Name</label>

            <input
              type="text"
              name="name"
              value={dish.name}
              onChange={handleChange}
              required
            />

          </div>

          <div className="adm-row">

            <div className="adm-group">

              <label>Category</label>

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

              <label>Price</label>

              <input
                type="number"
                name="price"
                value={dish.price}
                onChange={handleChange}
              />

            </div>

          </div>

          <div className="adm-row">

            <div className="adm-group">

              <label>Preparation Time</label>

              <input
                type="number"
                name="prepTime"
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
      available: e.target.value === "true",
    }))
  }
>
  <option value="true">Available</option>
  <option value="false">Unavailable</option>
</select>

            </div>

          </div>

          <div className="adm-group">

            <label>Description</label>

            <textarea
              rows="4"
              name="description"
              value={dish.description}
              onChange={handleChange}
            />

          </div>

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
              Save Dish
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default AddDishModal;