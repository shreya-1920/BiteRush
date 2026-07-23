import { useEffect, useState } from "react";

import {
  getAllCustomers,
  deleteCustomer,
  toggleBlockCustomer,
} from "../services/AdminCustomerServices";
import { FaSearch, FaEye, FaTrash, FaBan } from "react-icons/fa";
import { toast } from "react-toastify";

import ConfirmModal from "../components/ConfirmModal";

import CustomerDetailsModal from "../components/modals/CustomerDetailsModal";

function Customers() {
const [modalType, setModalType] = useState(null);
const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customers, setCustomers] = useState([]);
const [loading, setLoading] = useState(true);
const [search, setSearch] = useState("");
const fetchCustomers = async () => {
  try {
    const data = await getAllCustomers();
    setCustomers(data);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchCustomers();
}, []);
if (loading) {
  return <h2>Loading...</h2>;
}

const filteredCustomers = customers.filter((customer) => {
  const query = search.toLowerCase();

  return (
    customer.name?.toLowerCase().includes(query) ||
    customer.email?.toLowerCase().includes(query) ||
    customer.phone?.toLowerCase().includes(query) ||
    customer._id.slice(-6).toLowerCase().includes(query)
  );
});
  return (
    <div className="restaurants-page">

      <div className="page-header">

        <div>
          <h2>Customers</h2>
          <p>Manage registered customers</p>
        </div>



      </div>

      <div className="table-toolbar">

        <div className="search-box">

          <FaSearch className="search-icon" />

        <input
  type="text"
  placeholder="Search customers..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
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

  {filteredCustomers.length > 0 ? (

    filteredCustomers.map((customer) => (

      <tr key={customer._id}>

        <td>

          <div className="restaurant-info">

            <div className="restaurant-avatar">
              👤
            </div>

            <div>
              <h4>{customer.name}</h4>
              <span>ID #{customer._id.slice(-6)}</span>
            </div>

          </div>

        </td>

        <td>{customer.email}</td>

        <td>{customer.phone}</td>

        <td>{customer.totalOrders}</td>

        <td>{new Date(customer.createdAt).toLocaleDateString()}</td>

        <td>
          <span
            className={
              !customer.isBlocked
                ? "status delivered"
                : "status cancelled"
            }
          >
            {customer.isBlocked ? "Blocked" : "Active"}
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
              className={`icon-btn ${
                customer.isBlocked
                  ? "success-btn"
                  : "warning-btn"
              }`}
              title={
                customer.isBlocked
                  ? "Unblock Customer"
                  : "Block Customer"
              }
              onClick={async () => {
                try {
                  await toggleBlockCustomer(customer._id);

                  toast.success(
                    customer.isBlocked
                      ? "Customer unblocked successfully!"
                      : "Customer blocked successfully!"
                  );

                  fetchCustomers();
                } catch (err) {
                  toast.error(
                    err.response?.data?.message ||
                      "Something went wrong"
                  );
                }
              }}
            >
              <FaBan />
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

    ))

  ) : (

    <tr>
      <td
        colSpan="7"
        style={{
          textAlign: "center",
          padding: "25px",
        }}
      >
        No customers found.
      </td>
    </tr>

  )}

</tbody>

        </table>

      </div>




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
    onConfirm={async () => {
      try {
        await deleteCustomer(selectedCustomer._id);

        toast.success("Customer deleted successfully!");

        fetchCustomers();

        setModalType(null);
      } catch (err) {
        toast.error(err.response?.data?.message || "Something went wrong");
      }
    }}
/>
    </div>
  );
}

export default Customers;