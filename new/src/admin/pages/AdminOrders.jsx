import { FaSearch, FaEye,FaEdit } from "react-icons/fa";
import { useState } from "react";


import OrderDetailsModal from "../components/modals/OrderDetailsModal";
import StatusForm from "../components/forms/StatusForm";
import Modal from "../components/Modal";
function AdminOrders() {
  const [modalType, setModalType] = useState(null);
const [selectedOrder, setSelectedOrder] = useState(null);
  const orders = [
  {
    id: "#1001",
    customer: "Rahul",
    restaurant: "La Pinoz",
    amount: "₹520",
    status: "Delivered",
    payment: "Online",
    address: "Jaipur, Rajasthan",
    time: "20 Jul 2026, 7:30 PM",
  },
  {
    id: "#1002",
    customer: "Priya",
    restaurant: "Burger Farm",
    amount: "₹340",
    status: "Preparing",
    payment: "Cash",
    address: "Vaishali Nagar, Jaipur",
    time: "20 Jul 2026, 8:15 PM",
  },
  {
    id: "#1003",
    customer: "Aman",
    restaurant: "Pizza Hut",
    amount: "₹670",
    status: "Pending",
    payment: "Online",
    address: "Malviya Nagar, Jaipur",
    time: "20 Jul 2026, 8:45 PM",
  },
  {
    id: "#1004",
    customer: "Neha",
    restaurant: "Domino's",
    amount: "₹450",
    status: "Cancelled",
    payment: "Online",
    address: "Mansarovar, Jaipur",
    time: "20 Jul 2026, 9:10 PM",
  },
];

  return (
    <div className="restaurants-page">

      <div className="page-header">
        <div>
          <h2>Orders</h2>
          <p>Manage customer orders</p>
        </div>
      </div>

      <div className="table-toolbar">
        <div className="search-box">
          <FaSearch className="search-icon"/>
          <input placeholder="Search orders..." />
        </div>
      </div>

      <div className="table-card">

        <table className="admin-table">

          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Restaurant</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {orders.map((order) => (

              <tr key={order.id}>

                <td>{order.id}</td>

                <td>{order.customer}</td>

                <td>{order.restaurant}</td>

                <td>{order.amount}</td>

                <td>
                  <span className={`status ${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </td>

              <td>

    <div className="table-actions">

        <button
            className="icon-btn edit-btn"
            onClick={() => {
                setSelectedOrder(order);
                setModalType("view");
            }}
        >
            <FaEye />
        </button>

        <button
            className="icon-btn"
            onClick={() => {
                setSelectedOrder(order);
                setModalType("status");
            }}
        >
            <FaEdit />
        </button>

    </div>

</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>
<OrderDetailsModal
    open={modalType === "view"}
    order={selectedOrder}
    onClose={() => setModalType(null)}
/>

<Modal
    open={modalType === "status"}
    title="Update Order Status"
    onClose={() => setModalType(null)}
>
    <StatusForm
        status={selectedOrder?.status}
        onClose={() => setModalType(null)}
    />
</Modal>
    </div>
  );
}

export default AdminOrders;