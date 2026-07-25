

import {
  FaDollarSign,
  FaClipboardList,
  FaUtensils,
  FaStar,
  FaArrowUp,
  FaFire,
} from "react-icons/fa";

function RestaurantDashboard() {
  return (
    <div className="rp-dashboard">

      {/* =========================
            HEADER
      ========================== */}

      <div className="rp-dashboard-header">

        <div>

          <h1>
            Good Evening 👋
          </h1>

          <p>
            Welcome back, <strong>Pizza Palace</strong>. Here's your restaurant
            performance today.
          </p>

        </div>

        <div className="rp-dashboard-date">

          <span>Saturday</span>

          <h3>25 July 2026</h3>

        </div>

      </div>

      {/* =========================
            STATS
      ========================== */}

      <div className="rp-dashboard-stats">

        <div className="rp-stat-card">

          <div className="rp-stat-icon sales">

            <FaDollarSign />

          </div>

          <div>

            <span>Today's Sales</span>

            <h2>₹24,580</h2>

            <small>
              <FaArrowUp />
              12% from yesterday
            </small>

          </div>

        </div>

        <div className="rp-stat-card">

          <div className="rp-stat-icon orders">

            <FaClipboardList />

          </div>

          <div>

            <span>Orders Today</span>

            <h2>128</h2>

            <small>
              <FaArrowUp />
              8 New Orders
            </small>

          </div>

        </div>

        <div className="rp-stat-card">

          <div className="rp-stat-icon menu">

            <FaUtensils />

          </div>

          <div>

            <span>Menu Items</span>

            <h2>42</h2>

            <small>4 Categories</small>

          </div>

        </div>

        <div className="rp-stat-card">

          <div className="rp-stat-icon rating">

            <FaStar />

          </div>

          <div>

            <span>Average Rating</span>

            <h2>4.8</h2>

            <small>Excellent</small>

          </div>

        </div>

      </div>

      {/* =========================
          SALES + POPULAR
      ========================== */}

      <div className="rp-dashboard-grid">

        {/* Sales */}

        <div className="rp-sales-card">

          <div className="rp-card-header">

            <h3>Sales Overview</h3>

            <button>This Week</button>

          </div>

          <div className="rp-chart-placeholder">

            <FaFire />

            <h2>Sales Analytics</h2>

            <p>
              Sales graph will be displayed here using Recharts.
            </p>

          </div>

        </div>

        {/* Popular Dishes */}

        <div className="rp-popular-card">

          <div className="rp-card-header">

            <h3>Popular Dishes</h3>

          </div>

          <div className="rp-dish">

            <img
              src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300"
              alt=""
            />

            <div>

              <h4>Farmhouse Pizza</h4>

              <span>120 Orders</span>

            </div>

            <strong>₹320</strong>

          </div>

          <div className="rp-dish">

            <img
              src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300"
              alt=""
            />

            <div>

              <h4>Cheese Burger</h4>

              <span>98 Orders</span>

            </div>

            <strong>₹180</strong>

          </div>

          <div className="rp-dish">

            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300"
              alt=""
            />

            <div>

              <h4>Caesar Salad</h4>

              <span>84 Orders</span>

            </div>

            <strong>₹220</strong>

          </div>

        </div>
{/* =========================
      BOTTOM SECTION
========================= */}

<div className="rp-dashboard-bottom">

  {/* Recent Orders */}

  <div className="rp-orders-card">

    <div className="rp-card-header">

      <h3>Recent Orders</h3>

      <button>View All</button>

    </div>

    <table className="rp-orders-table">

      <thead>

        <tr>

          <th>Order ID</th>

          <th>Customer</th>

          <th>Amount</th>

          <th>Status</th>

        </tr>

      </thead>

      <tbody>

        <tr>

          <td>#1025</td>

          <td>Rahul Sharma</td>

          <td>₹560</td>

          <td>
            <span className="rp-status delivered">
              Delivered
            </span>
          </td>

        </tr>

        <tr>

          <td>#1024</td>

          <td>Priya Verma</td>

          <td>₹340</td>

          <td>
            <span className="rp-status preparing">
              Preparing
            </span>
          </td>

        </tr>

        <tr>

          <td>#1023</td>

          <td>Amit Singh</td>

          <td>₹760</td>

          <td>
            <span className="rp-status pending">
              Pending
            </span>
          </td>

        </tr>

      </tbody>

    </table>

  </div>

  {/* Quick Actions */}

  <div className="rp-actions-card">

    <div className="rp-card-header">

      <h3>Quick Actions</h3>

    </div>

    <button className="rp-action-btn">
      ➕ Add New Dish
    </button>

    <button className="rp-action-btn">
      📦 View Orders
    </button>

    <button className="rp-action-btn">
      📊 View Analytics
    </button>

    <button className="rp-action-btn">
      🏪 Edit Restaurant
    </button>

  </div>

</div>
      </div>

    </div>
  );
}

export default RestaurantDashboard;