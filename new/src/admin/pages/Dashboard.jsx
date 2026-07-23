import {
  FaClipboardList,
  FaMoneyBillWave,
  FaUtensils,
  FaUsers,
  FaCheckCircle,
  FaShoppingBag,
} from "react-icons/fa";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import "../styles/statCard.css";
import { getDashboardStats } from "../services/AdminDashboardServices";

function Dashboard() {
  const navigate = useNavigate();

  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchDashboard = async () => {
    try {
      const data = await getDashboardStats();
      setDashboard(data);
    } catch (err) {
      toast.error("Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) {
    return <h2>Loading Dashboard...</h2>;
  }

  return (
    <div className="dashboard">

      <div className="welcome-card">

        <div>
          <h2>Welcome Back, Admin 👋</h2>
          <p>
            Manage restaurants, orders and customers
            from one place.
          </p>
        </div>

       <div className="welcome-right">
  <h3>Today's Summary</h3>

  <p>
    <strong>{dashboard.totalOrders}</strong> Orders
  </p>

  <p>
    <strong>₹{dashboard.totalRevenue}</strong> Revenue
  </p>

 
</div>

      </div>

      <div className="admin-stats-grid">

        {[
          {
            icon: <FaClipboardList />,
            title: "TOTAL ORDERS",
            value: dashboard.totalOrders,
            className: "orders",
          },
          {
            icon: <FaMoneyBillWave />,
            title: "REVENUE",
            value: `₹${dashboard.totalRevenue}`,
            className: "revenue",
          },
          {
            icon: <FaUsers />,
            title: "CUSTOMERS",
            value: dashboard.totalCustomers,
            className: "customers",
          },
          {
            icon: <FaUtensils />,
            title: "RESTAURANTS",
            value: dashboard.totalRestaurants,
            className: "restaurants",
          },
          {
            icon: <FaShoppingBag />,
            title: "PENDING",
            value: dashboard.pendingOrders,
            className: "pending",
          },
          {
            icon: <FaCheckCircle />,
            title: "DELIVERED",
            value: dashboard.deliveredOrders,
            className: "delivered",
          },
        ].map((card, index) => (
          <div key={index} className="admin-stat-card">

            <div className="admin-stat-header">
              <div className={`admin-stat-icon ${card.className}`}>
                {card.icon}
              </div>
            </div>

            <div className="admin-stat-body">
              <p className="admin-stat-title">{card.title}</p>
              <h2 className="admin-stat-value">{card.value}</h2>
            </div>

          </div>
        ))}

      </div>

      <div className="dashboard-grid">

        <div className="dashboard-left">
            <div className="admin-card chart-card">

  <div className="chart-top">

    <div>
      <h3>Revenue Overview</h3>
      <p>Weekly revenue performance</p>
    </div>

    <select>
      <option>This Week</option>
      <option>Last Week</option>
    </select>

  </div>

 <div className="chart-container">

  <ResponsiveContainer width="100%" height={300}>

    <BarChart data={dashboard.weeklyRevenue}>

      <CartesianGrid strokeDasharray="3 3" />

      <XAxis dataKey="day" />

      <YAxis />

      <Tooltip />

      <Bar
        dataKey="revenue"
        radius={[8, 8, 0, 0]}
      />

    </BarChart>

  </ResponsiveContainer>

</div>

  </div>



<div className="admin-card recent-orders">

  <div className="section-header">

    <h3>Recent Orders</h3>

    <button
      className="view-all-btn"
      onClick={() => navigate("/admin/orders")}
    >
      View All
    </button>

  </div>

  <table className="orders-table">

    <thead>

      <tr>
        <th>Order</th>
        <th>Customer</th>
        <th>Amount</th>
        <th>Status</th>
      </tr>

    </thead>

    <tbody>

      {dashboard.recentOrders?.length > 0 ? (

        dashboard.recentOrders.map((order) => (

          <tr
            key={order._id}
            onClick={() => navigate("/admin/orders")}
            style={{ cursor: "pointer" }}
          >

            <td className="order-id">
              #{order._id.slice(-6)}
            </td>

            <td>

              <div className="customer-info">

                <div className="customer-avatar">
                  {order.user?.name?.charAt(0).toUpperCase()}
                </div>

                <div>

                  <div className="customer-name">
                    {order.user?.name}
                  </div>

                  <div className="customer-email">
                    {order.user?.email}
                  </div>

                </div>

              </div>

            </td>

            <td className="order-price">
              ₹{order.total}
            </td>

            <td>

              <span
                className={`status ${
                  order.status === "Delivered"
                    ? "delivered"
                    : order.status === "Pending"
                    ? "pending"
                    : "preparing"
                }`}
              >
                {order.status}
              </span>

            </td>

          </tr>

        ))

      ) : (

        <tr>

          <td
            colSpan="4"
            style={{ textAlign: "center", padding: "20px" }}
          >
            No Orders Found
          </td>

        </tr>

      )}

    </tbody>

  </table>

</div>

</div> {/* dashboard-left */}

<div className="dashboard-right">
    {/* Quick Actions */}

<div className="admin-card quick-actions-card">

  <h3>Quick Actions</h3>

  <div className="quick-actions">

    <button
      className="quick-btn"
      onClick={() => navigate("/admin/restaurants")}
    >
      Add Restaurant
    </button>

    <button
      className="quick-btn"
      onClick={() => navigate("/admin/coupons")}
    >
      Create Coupon
    </button>

    <button
      className="quick-btn"
      onClick={() => navigate("/admin/orders")}
    >
      Manage Orders
    </button>

    <button
      className="quick-btn"
      onClick={() => navigate("/admin/customers")}
    >
      Customers
    </button>

  </div>

</div>

{/* Top Restaurants */}

<div className="admin-card top-restaurants-card">

  <div className="section-header">
    <h3>Top Restaurants</h3>
  </div>

  <div className="restaurant-list">

    {dashboard.topRestaurants?.length > 0 ? (

      dashboard.topRestaurants.map((restaurant) => (

        <div
          key={restaurant._id}
          className="restaurant-item"
          onClick={() => navigate("/admin/restaurants")}
          style={{ cursor: "pointer" }}
        >

          <div className="restaurant-left">

            <div className="restaurant-avatar">
              🍽️
            </div>

            <div className="restaurant-details">
              <h4>{restaurant.name}</h4>
              <span>
                {restaurant.category} • {restaurant.city}
              </span>
            </div>

          </div>

          <div className="restaurant-sales">
            ⭐ {restaurant.rating}
          </div>

        </div>

      ))

    ) : (

      <p style={{ textAlign: "center", padding: "20px" }}>
        No Restaurants Found
      </p>

    )}

  </div>

</div>

{/* Latest Customers */}

<div className="admin-card latest-customers-card">

  <div className="section-header">
    <h3>Latest Customers</h3>
  </div>

  <div className="customer-list">

    {dashboard.latestCustomers?.length > 0 ? (

      dashboard.latestCustomers.map((customer) => (

        <div
          key={customer._id}
          className="customer-item"
          onClick={() => navigate("/admin/customers")}
          style={{ cursor: "pointer" }}
        >

          <div className="customer-left">

            <div className="customer-photo">
              {customer.name?.charAt(0).toUpperCase()}
            </div>

            <div className="customer-meta">
              <h4>{customer.name}</h4>
              <p>{customer.email}</p>
            </div>

          </div>

          <div className="join-date">
            {new Date(customer.createdAt).toLocaleDateString()}
          </div>

        </div>

      ))

    ) : (

      <p style={{ textAlign: "center", padding: "20px" }}>
        No Customers Found
      </p>

    )}


  </div> 

</div> 

</div> 

</div> 

</div> 

  );
}

export default Dashboard;