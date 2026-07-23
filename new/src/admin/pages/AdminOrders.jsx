import { FaEye } from "react-icons/fa";
import { useEffect, useState } from "react";
import {
  getAllOrders,
  updateOrderStatus,
} from "../services/AdminOrderServices";
import { useSearch } from "../context/SearchContext";
import OrderDetailsModal from "../components/modals/OrderDetailsModal";
import StatusForm from "../components/forms/StatusForm";
import Modal from "../components/Modal";
function AdminOrders() {
  const [modalType, setModalType] = useState(null);
const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);

const [loading, setLoading] = useState(true);
const { search } = useSearch();
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
const filteredOrders = orders.filter((order) => {
  const query = search.toLowerCase();

  return (
    order._id.slice(-6).toLowerCase().includes(query) ||
    order.user?.name?.toLowerCase().includes(query) ||
    order.restaurant?.name?.toLowerCase().includes(query) ||
    order.status?.toLowerCase().includes(query)
  );
});
  return (
    <div className="restaurants-page">

      <div className="page-header">
        <div>
          <h2>Orders</h2>
          <p>Manage customer orders</p>
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
  {filteredOrders.length > 0 ? (
    filteredOrders.map((order) => (
      <tr key={order._id}>
        <td>#{order._id.slice(-6)}</td>

        <td>{order.user?.name}</td>

        <td>{order.restaurant?.name}</td>

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
          </div>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td
        colSpan="6"
        style={{
          textAlign: "center",
          padding: "25px",
        }}
      >
        No orders found.
      </td>
    </tr>
  )}
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