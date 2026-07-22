import { FaSearch, FaEye,FaEdit } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  getAllOrders,
  updateOrderStatus,
} from "../services/AdminOrderServices";

import OrderDetailsModal from "../components/modals/OrderDetailsModal";
import StatusForm from "../components/forms/StatusForm";
import Modal from "../components/Modal";
function AdminOrders() {
  const [modalType, setModalType] = useState(null);
const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
const [loading, setLoading] = useState(true);

const fetchOrders = async () => {
  try {
    const data = await getAllOrders();
    setOrders(data);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};
useEffect(() => {
  fetchOrders();
}, []);

if (loading) {
  return <h2>Loading...</h2>;
}
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

              <tr key={order._id}>

                <td>#{order._id.slice(-6)}</td>

               <td>{order.user?.name}</td>

                <td>#{order._id.slice(-6)}</td>

               <td>₹{order.total}</td>

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
    order={selectedOrder}
    onSave={async (status) => {
        await updateOrderStatus(selectedOrder._id, status);

        await fetchOrders();

        setModalType(null);
    }}
    onClose={() => setModalType(null)}
/>
</Modal>
    </div>
  );
}

export default AdminOrders;