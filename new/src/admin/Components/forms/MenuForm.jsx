import { useState, useEffect } from "react";
import { toast } from "react-toastify";
function MenuForm({ mode, item, onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    status: "Active",
  });

  useEffect(() => {
    if (mode === "edit" && item) {
      setFormData({
        name: item.name || "",
        category: item.category || "",
        price: item.price || "",
        status: item.status || "Active",
      });
    } else {
      setFormData({
        name: "",
        category: "",
        price: "",
        status: "Active",
      });
    }
  }, [mode, item]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    if (mode === "edit") {
        toast.success("Menu item updated successfully!");
    } else {
        toast.success("Menu item added successfully!");
    }

    onClose();
};

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-group">
          <label>Item Name</label>

          <input
            type="text"
            name="name"
            placeholder="Enter item name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Category</label>

          <input
    type="text"
    name="category"
    placeholder="Enter category"
    value={formData.category}
    onChange={handleChange}
/>
        </div>

        <div className="form-group">
          <label>Price</label>

          <input
    type="text"
    name="price"
    placeholder="Enter price"
    value={formData.price}
    onChange={handleChange}
/>
        </div>

        <div className="form-group">
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