import {
  FaPlus,
  
  FaEdit,
  FaTrash,
} from "react-icons/fa";

import { toast } from "react-toastify";
import { useState, useEffect } from "react";

import {
  getMenus,
  deleteMenu,
} from "../Services/MenuService";
import { useSearch } from "../context/SearchContext";
import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";
import MenuForm from "../components/forms/MenuForm";

function AdminMenu() {
  const [modalType, setModalType] = useState(null);
  const [loading, setLoading] = useState(true);

  const [menuItems, setMenuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

 const { search } = useSearch();
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
    item.name?.toLowerCase().includes(text) ||
    item.category?.toLowerCase().includes(text) ||
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
  ...new Set(
    menuItems
      .map((item) => item.category)
      .filter(Boolean)
  ),
];

const statuses = [
  ...new Set(
    menuItems
      .map((item) => item.status)
      .filter(Boolean)
  ),
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

      <div >

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

                      <div className="admin-menu-item-info">

                        <div className="admin-menu-item-avatar">

                          {item.image ? (
                            <img
                              src={item.image}
                              alt={item.name}
                            />
                          ) : (
                            "🍔"
                          )}

                        </div>

                        <div className="admin-menu-item-details">

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
                      <span className={item.isVeg ? "admin-menu-type veg" : "admin-menu-type non-veg"}>
                        {item.isVeg ? "Veg" : "Non Veg"}
                      </span>
                    </td>

                    <td>
                      <span className={item.status==="Available" ? "admin-menu-status available" : "admin-menu-status unavailable"}>
                        {item.status}
                      </span>
                    </td>

                    <td>
                     <div className="admin-menu-actions">

                        <button
                          className="admin-menu-btn admin-menu-edit-btn"
                          onClick={() => {
                            setSelectedItem(item);
                            setModalType("edit");
                          }}
                        >
                          <FaEdit />
                        </button>

                        <button
                          className="admin-menu-btn admin-menu-delete-btn"
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