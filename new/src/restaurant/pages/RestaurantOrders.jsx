import { useState } from "react";
import {
  FaSearch,
  FaEye,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

import "../styles/Restaurant-panel.css";

function RestaurantOrders() {
  const [status, setStatus] = useState("All");

  const orders = [
    {
      id: "#1025",
      customer: "Rahul Sharma",
      items: 3,
      amount: 560,
      status: "Preparing",
    },
    {
      id: "#1024",
      customer: "Priya Verma",
      items: 2,
      amount: 340,
      status: "Pending",
    },
    {
      id: "#1023",
      customer: "Amit Singh",
      items: 4,
      amount: 760,
      status: "Delivered",
    },
    {
      id: "#1022",
      customer: "Neha Jain",
      items: 1,
      amount: 220,
      status: "Cancelled",
    },
  ];

  return (
    <div className="ro-page">

      {/* Header */}

      <div className="ro-header">

        <div>

          <h1>Orders</h1>

          <p>Manage all incoming restaurant orders.</p>

        </div>

      </div>

      {/* Toolbar */}

      <div className="ro-toolbar">

        <div className="ro-search">

          <FaSearch />

          <input
            type="text"
            placeholder="Search Order ID..."
          />

        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >

          <option>All</option>
          <option>Pending</option>
          <option>Preparing</option>
          <option>Delivered</option>
          <option>Cancelled</option>

        </select>

      </div>

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

            {orders.map((order) => (

              <tr key={order.id}>

                <td>{order.id}</td>

                <td>{order.customer}</td>

                <td>{order.items}</td>

                <td>₹{order.amount}</td>

                <td>

                  <span
                    className={`ro-status ${order.status.toLowerCase()}`}
                  >
                    {order.status}
                  </span>

                </td>

                <td>

                  <div className="ro-actions">

                    <button className="view-btn">
                      <FaEye />
                    </button>

                    <button className="accept-btn">
                      <FaCheck />
                    </button>

                    <button className="reject-btn">
                      <FaTimes />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default RestaurantOrders;