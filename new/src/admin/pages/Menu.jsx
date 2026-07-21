import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { useState } from "react";
import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";
import MenuForm from "../components/forms/MenuForm";
function Menu() {
  const [modalType, setModalType] = useState(null);
const [selectedItem, setSelectedItem] = useState(null);
  const menuItems = [
    {
      id: 1,
      name: "Margherita Pizza",
      category: "Pizza",
      price: "₹299",
      status: "Active",
    },
    {
      id: 2,
      name: "Veg Burger",
      category: "Burger",
      price: "₹199",
      status: "Active",
    },
    {
      id: 3,
      name: "White Sauce Pasta",
      category: "Pasta",
      price: "₹249",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Cold Coffee",
      category: "Beverage",
      price: "₹149",
      status: "Active",
    },
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
          />

        </div>

        <div className="toolbar-right">

          <select>
            <option>All Categories</option>
            <option>Pizza</option>
            <option>Burger</option>
            <option>Pasta</option>
            <option>Beverage</option>
          </select>

          <select>
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>

        </div>

      </div>

      <div className="table-card">

        <table className="admin-table">

          <thead>

            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {menuItems.map((item) => (

              <tr key={item.id}>

                <td>

                  <div className="restaurant-info">

                    <div className="restaurant-avatar">
                      🍕

                    </div>

                    <div>

                      <h4>{item.name}</h4>

                      <span>ID #{item.id}</span>

                    </div>

                  </div>

                </td>

                <td>{item.category}</td>

                <td>{item.price}</td>

                <td>

                  <span
                    className={
                      item.status === "Active"
                        ? "status delivered"
                        : "status cancelled"
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

            ))}

          </tbody>

        </table>
<Modal
    open={modalType === "add" || modalType === "edit"}
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
    />
</Modal>

<ConfirmModal
    open={modalType === "delete"}
    title="Delete Menu Item"
    message={`Are you sure you want to delete "${selectedItem?.name}"?`}
    onClose={() => setModalType(null)}
    onConfirm={() => {
        console.log("Delete Menu Item", selectedItem);

        toast.success("Menu item deleted successfully!");

        setModalType(null);
    }}
/>

      </div>
    </div>
  );
}

export default Menu;