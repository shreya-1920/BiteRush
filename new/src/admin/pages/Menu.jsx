import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import { toast } from "react-toastify";
import { useState, useEffect } from "react";

import {
  getMenus,
  deleteMenu,
} from "../Services/MenuService";

import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";
import MenuForm from "../components/forms/MenuForm";

function AdminMenu() {
  const [modalType, setModalType] = useState(null);
  const [loading, setLoading] = useState(true);

  const [menuItems, setMenuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  const fetchMenus = async () => {
    try {
      setLoading(true);

      const res = await getMenus();

      setMenuItems(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Failed to load menu items");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleDelete = async () => {
    try {
      await deleteMenu(selectedItem._id);

      toast.success("Menu item deleted successfully!");

      fetchMenus();

      setModalType(null);
      setSelectedItem(null);
    } catch (err) {
      console.log(err);

      toast.error("Failed to delete menu item");
    }
  };

  const filteredItems = menuItems.filter((item) => {
    const text = search.toLowerCase();

    const matchesSearch =
      item.name.toLowerCase().includes(text) ||
      item.category.toLowerCase().includes(text) ||
      item.restaurant?.name?.toLowerCase().includes(text);

    const matchesCategory =
      categoryFilter === "All" ||
      item.category === categoryFilter;

    const matchesStatus =
      statusFilter === "All" ||
      item.status === statusFilter;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesStatus
    );
  });

  const categories = [
    ...new Set(menuItems.map((item) => item.category)),
  ];

  const statuses = [
    ...new Set(menuItems.map((item) => item.status)),
  ];

  return (
    <div className="restaurants-page">

      <div className="page-header">

        <div>
          <h2>Menu Management</h2>
          <p>Manage restaurant menu items</p>
        </div>

        <button
          className="admin-btn"
          onClick={() => {
            setSelectedItem(null);
            setModalType("add");
          }}
        >
          <FaPlus />
          <span>Add Menu Item</span>
        </button>

      </div>

      <div className="table-toolbar">

        <div className="search-box">

          <FaSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search menu..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        <div className="toolbar-right">

          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(e.target.value)
            }
          >
            <option value="All">
              All Categories
            </option>

            {categories.map((category) => (
              <option
                key={category}
                value={category}
              >
                {category}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) =>
              setStatusFilter(e.target.value)
            }
          >
            <option value="All">
              All Status
            </option>

            {statuses.map((status) => (
              <option
                key={status}
                value={status}
              >
                {status}
              </option>
            ))}
          </select>

        </div>

      </div>

      <div className="table-card">

        {loading ? (

          <div className="loading-state">
            Loading menu items...
          </div>

        ) : (

          <table className="admin-table">

            <thead>

              <tr>

                <th>Item</th>
                <th>Restaurant</th>
                <th>Category</th>
                <th>Price</th>
                <th>Type</th>
                <th>Status</th>
                <th>Actions</th>

              </tr>

            </thead>

            <tbody>

              {filteredItems.length > 0 ? (

                filteredItems.map((item) => (

                  <tr key={item._id}>

                    <td>

                      <div className="restaurant-info">

                        <div className="restaurant-avatar">

                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                            />
                          ) : (
                            "🍔"
                          )}

                        </div>

                        <div>

                          <h4>{item.name}</h4>

                          <span>
                            ₹{item.price}
                          </span>

                        </div>

                      </div>

                    </td>

                    <td>{item.restaurant?.name}</td>

                    <td>{item.category}</td>
                                        <td>₹{item.price}</td>

                    <td>
                      <span
                        className={
                          item.isVeg
                            ? "status active"
                            : "status inactive"
                        }
                      >
                        {item.isVeg ? "Veg" : "Non Veg"}
                      </span>
                    </td>

                    <td>
                      <span
                        className={
                          item.status === "Available"
                            ? "status active"
                            : "status inactive"
                        }
                      >
                        {item.status}
                      </span>
                    </td>

                    <td>
                      <div className="table-actions">

                        <button
                          className="icon-btn edit-btn"
                          onClick={() => {
                            setSelectedItem(item);
                            setModalType("edit");
                          }}
                        >
                          <FaEdit />
                        </button>

                        <button
                          className="icon-btn delete-btn"
                          onClick={() => {
                            setSelectedItem(item);
                            setModalType("delete");
                          }}
                        >
                          <FaTrash />
                        </button>

                      </div>
                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan="7"
                    className="empty-table"
                  >
                    🍽️ No menu items found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        )}

      </div>

      <Modal
        open={
          modalType === "add" ||
          modalType === "edit"
        }
        title={
          modalType === "add"
            ? "Add Menu Item"
            : "Edit Menu Item"
        }
        onClose={() => setModalType(null)}
      >
        <MenuForm
          mode={modalType}
          item={selectedItem}
          onClose={() => setModalType(null)}
          onSuccess={fetchMenus}
        />
      </Modal>

      <ConfirmModal
        open={modalType === "delete"}
        title="Delete Menu Item"
        message={`Are you sure you want to delete "${selectedItem?.name}"?`}
        onClose={() => setModalType(null)}
        onConfirm={handleDelete}
      />

    </div>
  );
}

export default AdminMenu;