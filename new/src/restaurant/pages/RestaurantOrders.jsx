import { useState } from "react";
import {  FaEye } from "react-icons/fa";
import { toast } from "react-toastify";
import {
    FaClipboardList,
    FaUtensils,
    FaCircleCheck,
    FaIndianRupeeSign
} from "react-icons/fa6";
import { useEffect } from "react";

import { useSearch } from "../context/SearchContext";
import {
  getOrders,
  
  updateStatus,
} from "../services/RestaurantOrderServices";
import "../styles/Restaurant-panel.css";

function RestaurantOrders() {
  const [status, ] = useState("All");


const { search } = useSearch();
const [selectedOrder, setSelectedOrder] = useState(null);
  const [orders, setOrders] = useState([]);
const [loading, setLoading] = useState(true);




const filteredOrders = orders.filter((order) => {

    const query = search.toLowerCase();

    // This is the Order ID shown in the table
    const displayOrderId = order._id.slice(-6).toUpperCase();

    const matchesSearch =
        displayOrderId.includes(search.toUpperCase()) ||
        order.name.toLowerCase().includes(query) ||
        (order.phone || "").toLowerCase().includes(query) ||
        order.status.toLowerCase().includes(query);

    const matchesStatus =
        status === "All" || order.status === status;

    return matchesSearch && matchesStatus;
});
const updateOrderStatus = async (id, newStatus) => {
  try {
    await updateStatus(id, newStatus);

    await fetchOrders();

    switch (newStatus) {
      case "Preparing":
        toast.info("Order is now Preparing 🍳");
        break;

      case "Out for Delivery":
        toast.info("Order is Out for Delivery 🚚");
        break;

      case "Delivered":
        toast.success("Order Delivered Successfully 🎉");
        break;

      case "Cancelled":
        toast.error("Order Cancelled");
        break;

      default:
        toast.success("Order Updated");
    }
  } catch (err) {
    toast.error(
      err.response?.data?.message ||
      "Unable to update order"
    );
  }
};
useEffect(() => {
    fetchOrders();

    const interval = setInterval(() => {
        fetchOrders();
    }, 45000);

    return () => clearInterval(interval);
}, []);

const fetchOrders = async () => {
  try {
    setLoading(true);

    const data = await getOrders();

    console.log(data);

    setOrders(data.orders);
  } catch (err) {
    console.error(err);
    toast.error("Unable to load orders");
  } finally {
    setLoading(false);
  }
};
if (loading) {
  return <h2>Loading Orders...</h2>;
}
  return (
    <div className="ro-page">

      {/* Header */}

      <div className="ro-header">

        <div>

          <h1>Orders</h1>

          <p>Manage all incoming restaurant orders.</p>

        </div>

      </div>
<div className="ro-summary">

    <div className="summary-card">

        <div className="summary-icon pending">
            <FaClipboardList />
        </div>

        <h4>Pending Orders</h4>

        <h2>
            {orders.filter(o => o.status === "Pending").length}
        </h2>

    </div>

    <div className="summary-card">

        <div className="summary-icon preparing">
            <FaUtensils />
        </div>

        <h4>Preparing</h4>

        <h2>
            {orders.filter(o => o.status === "Preparing").length}
        </h2>

    </div>

    <div className="summary-card">

        <div className="summary-icon delivered">
            <FaCircleCheck />
        </div>

        <h4>Delivered</h4>

        <h2>
            {orders.filter(o => o.status === "Delivered").length}
        </h2>

    </div>

    <div className="summary-card">

        <div className="summary-icon sales">
            <FaIndianRupeeSign />
        </div>

        <h4>Today's Sales</h4>

        <h2>

            ₹{

orders
  .filter(o => o.status === "Delivered")
  .reduce((sum, order) => sum + order.total, 0)

            }

        </h2>

    </div>

</div>
      {/* Toolbar */}

      

      {/* Orders Table */}

      <div className="ro-card">

        <table className="ro-table">

          <thead>

            <tr>

              <th>Order ID</th>

              <th>Customer</th>

              <th>Items</th>

              <th>Amount</th>

              <th>Status</th>

              <th>Actions</th>

            </tr>

          </thead>

        

            <tbody>

  {filteredOrders.length > 0 ? (

    filteredOrders.map((order) => (

      <tr key={order._id}>

        <td>#{order._id.slice(-6).toUpperCase()}</td>

        <td>{order.name}</td>

        <td>{order.items.length}</td>

        <td>₹{order.total}</td>

        <td>
          <span
            className={`ro-status ${order.status
              .toLowerCase()
              .replace(/\s/g, "-")}`}
          >
            {order.status}
          </span>
        </td>

        <td>

          <div className="ro-actions">

            <button
              className="view-btn"
              onClick={() => setSelectedOrder(order)}
            >
              <FaEye />
            </button>
<div className="status-dropdown-wrapper">
            <select
              className={`status-dropdown ${order.status
                .toLowerCase()
                .replace(/\s/g, "-")}`}
              value={order.status}
              disabled={
                order.status === "Delivered" ||
                order.status === "Cancelled"
              }
              onChange={(e) =>
                updateOrderStatus(order._id, e.target.value)
              }
            >

              <option value="Pending">Pending</option>

              <option value="Preparing">
                Preparing
              </option>

              <option value="Out for Delivery">
                Out for Delivery
              </option>

              <option value="Delivered">
                Delivered
              </option>

              <option value="Cancelled">
                Cancelled
              </option>

            </select>

          </div>
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
          padding: "30px",
        }}
      >

        No Orders Found

      </td>

    </tr>

  )}


          </tbody>

        </table>
{selectedOrder && (

<div className="ro-modal-overlay">

    <div className="ro-modal">

        <div className="ro-modal-header">

            <div>

                <h2>Order #{selectedOrder._id.slice(-6).toUpperCase()}</h2>

                <span className={`ro-status ${selectedOrder.status.toLowerCase().replace(/\s/g,"-")}`}>
                    {selectedOrder.status}
                </span>

            </div>

            <button
                className="close-modal"
                onClick={() => setSelectedOrder(null)}
            >
                ✕
            </button>

        </div>

        <div className="ro-info">

            <div>

                <h4>Customer</h4>

                <p>{selectedOrder.name}</p>

            </div>

            <div>

                <h4>Phone</h4>

                <p>{selectedOrder.phone}</p>

            </div>

        </div>

        <div className="ro-info">

            <div>

                <h4>Delivery Address</h4>

                <p>{selectedOrder.address}</p>

            </div>

            <div>

                <h4>Payment</h4>

                <p>{selectedOrder.paymentMethod}</p>

            </div>

        </div>

        <div className="ro-items-card">

            <h3>Ordered Items</h3>

            {selectedOrder.items.map((dish,index)=>(

                <div
                    className="ro-item"
                    key={index}
                >

                    <span>{dish.name}</span>

                   <strong>x{dish.quantity}</strong>

                </div>

            ))}

        </div>

        <div className="bill-summary">

            <div>

                <span>Subtotal</span>

                <span>₹{selectedOrder.subtotal}</span>

            </div>

            <div>

                <span>Delivery Fee</span>

                <span>₹{selectedOrder.deliveryFee}</span>

            </div>

            <div className="total">

                <span>Total</span>

                <strong>₹{selectedOrder.total}</strong>

            </div>

        </div>

    </div>

</div>

)}
      </div>

    </div>
  );
}

export default RestaurantOrders;