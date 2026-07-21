import { useState } from "react";
import {FaUserPlus , FaSearch, FaEye, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";
import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";
import CustomerForm from "../components/forms/CustomerForm";
import CustomerDetailsModal from "../components/modals/CustomerDetailsModal";

function Customers() {
const [modalType, setModalType] = useState(null);
const [selectedCustomer, setSelectedCustomer] = useState(null);
  const customers = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      phone: "+91 9876543210",
      orders: 18,
      joined: "12 Jul 2026",
      status: "Active",
    },
    {
      id: 2,
      name: "Priya Verma",
      email: "priya@gmail.com",
      phone: "+91 9123456789",
      orders: 24,
      joined: "18 Jul 2026",
      status: "Active",
    },
    {
      id: 3,
      name: "Aman Singh",
      email: "aman@gmail.com",
      phone: "+91 9988776655",
      orders: 6,
      joined: "20 Jul 2026",
      status: "Blocked",
    },
  ];

  return (
    <div className="restaurants-page">

      <div className="page-header">

        <div>
          <h2>Customers</h2>
          <p>Manage registered customers</p>
        </div>

<button
    className="admin-btn"
    onClick={() => {
        setSelectedCustomer(null);
        setModalType("add");
    }}
>
    <FaUserPlus />
    <span>Add Customer</span>
</button>

      </div>

      <div className="table-toolbar">

        <div className="search-box">

          <FaSearch className="search-icon" />

          <input
            type="text"
            placeholder="Search customers..."
          />

        </div>

      </div>

      <div className="table-card">

        <table className="admin-table">

          <thead>

            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Orders</th>
              <th>Joined</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {customers.map((customer) => (

              <tr key={customer.id}>

                <td>

                  <div className="restaurant-info">

                    <div className="restaurant-avatar">
                      👤
                    </div>

                    <div>
                      <h4>{customer.name}</h4>
                      <span>ID #{customer.id}</span>
                    </div>

                  </div>

                </td>

                <td>{customer.email}</td>

                <td>{customer.phone}</td>

                <td>{customer.orders}</td>

                <td>{customer.joined}</td>

                <td>

                  <span
                    className={
                      customer.status === "Active"
                        ? "status delivered"
                        : "status cancelled"
                    }
                  >
                    {customer.status}
                  </span>

                </td>

                <td>

                  <div className="table-actions">

                <button
    className="icon-btn edit-btn"
    onClick={() => {
        setSelectedCustomer(customer);
        setModalType("view");
    }}
>
    <FaEye />
</button>

                    <button
    className="icon-btn delete-btn"
    onClick={() => {
        setSelectedCustomer(customer);
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

      </div>
{/* Add Customer */}

<Modal
    open={modalType === "add"}
    title="Add Customer"
    onClose={() => setModalType(null)}
>
    <CustomerForm
        onClose={() => setModalType(null)}
    />
</Modal>

{/* View Customer */}

<CustomerDetailsModal
    open={modalType === "view"}
    customer={selectedCustomer}
    onClose={() => setModalType(null)}
/>

{/* Delete Customer */}

<ConfirmModal
    open={modalType === "delete"}
    title="Delete Customer"
    message={`Are you sure you want to delete "${selectedCustomer?.name}"?`}
    onClose={() => setModalType(null)}
  onConfirm={() => {
    console.log(selectedCustomer);

    toast.success("Customer deleted successfully!");

    setModalType(null);
}}
/>
    </div>
  );
}

export default Customers;