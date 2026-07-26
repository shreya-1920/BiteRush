

import {
  FaDollarSign,
  FaClipboardList,
  FaUtensils,
  FaStar,
  FaArrowUp,
  FaChartLine,
  FaStore,
  FaPlus
  
} from "react-icons/fa";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";
import "../styles/Restaurant-panel.css";
const salesData = [
  { day: "Sun", sales: 12 },
  { day: "Mon", sales: 18 },
  { day: "Tue", sales: 15 },
  { day: "Wed", sales: 28 },
  { day: "Thu", sales: 25 },
  { day: "Fri", sales: 35 },
  { day: "Sat", sales: 42 },
];
function RestaurantDashboard() {
  return (
    <div className="rp-dashboard">

      {/* =========================
            HEADER
      ========================== */}

      <div className="rp-dashboard-header">

        <div className="restaurant-banner">

    <div className="restaurant-banner-left">

    <h1>
        Welcome Back, Pizza Palace 
    </h1>

    <p>
        Manage your restaurant, orders and customers from one place.
    </p>

</div>



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

    <div className="rp-sales-header">

        <div>

            <h3>Sales Overview</h3>

            <p>Weekly sales performance</p>

        </div>

        <select>

            <option>This Week</option>

            <option>Last Week</option>

            <option>This Month</option>

        </select>

    </div>

    <div className="rp-sales-chart">

        <ResponsiveContainer width="100%" height="100%">

            <LineChart data={salesData}>

                <CartesianGrid
                    strokeDasharray="4 4"
                    stroke="#E5E7EB"
                />

                <XAxis
                    dataKey="day"
                    tick={{ fill:"#64748B" }}
                />

                <YAxis
                    tick={{ fill:"#64748B" }}
                />

                <Tooltip/>

                <Line
                    type="monotone"
                    dataKey="sales"
                    stroke="#F97316"
                    strokeWidth={4}
                    dot={{
                        r:5,
                        fill:"#F97316"
                    }}
                    activeDot={{
                        r:8
                    }}
                />

            </LineChart>

        </ResponsiveContainer>

    </div>

</div>
        {/* Popular Dishes */}
<div className="rp-popular-card">

    <div className="rp-card-header">

        <h3>Popular Dishes</h3>

    </div>

    <div className="rp-popular-list">

        <div className="rp-popular-item">

            <img
                src="https://images.unsplash.com/photo-1513104890138-7c749659a591?w=300"
                alt=""
            />

            <div className="rp-popular-info">

                <h4>Farmhouse Pizza</h4>

                <span>Pizza • Bestseller</span>

            </div>

            <div className="rp-popular-rating">

                ⭐ 4.8

            </div>

        </div>

        <div className="rp-popular-item">

            <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300"
                alt=""
            />

            <div className="rp-popular-info">

                <h4>Cheese Burger</h4>

                <span>Fast Food • Popular</span>

            </div>

            <div className="rp-popular-rating">

                ⭐ 4.6

            </div>

        </div>

        <div className="rp-popular-item">

            <img
                src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300"
                alt=""
            />

            <div className="rp-popular-info">

                <h4>Caesar Salad</h4>

                <span>Healthy • Fresh</span>

            </div>

            <div className="rp-popular-rating">

                ⭐ 4.5

            </div>

        </div>

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

                <th>Order</th>

                <th>Customer</th>

                <th>Amount</th>

                <th>Status</th>

            </tr>

        </thead>

        <tbody>

            <tr>

                <td>

                    <strong>#1025</strong>

                </td>

                <td>

                    <div className="rp-customer">

                        <div className="rp-avatar-small">

                            R

                        </div>

                        <div>

                            <h5>Rahul Sharma</h5>

                            <span>rahul@gmail.com</span>

                        </div>

                    </div>

                </td>

                <td>

                    ₹560

                </td>

                <td>

                    <span className="rp-status delivered">

                        Delivered

                    </span>

                </td>

            </tr>

            <tr>

                <td>

                    <strong>#1024</strong>

                </td>

                <td>

                    <div className="rp-customer">

                        <div className="rp-avatar-small">

                            P

                        </div>

                        <div>

                            <h5>Priya Verma</h5>

                            <span>priya@gmail.com</span>

                        </div>

                    </div>

                </td>

                <td>

                    ₹340

                </td>

                <td>

                    <span className="rp-status preparing">

                        Preparing

                    </span>

                </td>

            </tr>

            <tr>

                <td>

                    <strong>#1023</strong>

                </td>

                <td>

                    <div className="rp-customer">

                        <div className="rp-avatar-small">

                            A

                        </div>

                        <div>

                            <h5>Amit Singh</h5>

                            <span>amit@gmail.com</span>

                        </div>

                    </div>

                </td>

                <td>

                    ₹760

                </td>

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

    <div className="rp-actions-list">

        <button className="rp-action-btn">
            <FaPlus />
            <span>Add New Dish</span>
        </button>

        <button className="rp-action-btn">
            <FaClipboardList />
            <span>View Orders</span>
        </button>

        <button className="rp-action-btn">
            <FaChartLine />
            <span>View Analytics</span>
        </button>

        <button className="rp-action-btn">
            <FaStore />
            <span>Edit Restaurant</span>
        </button>

    </div>

</div>


</div>
      </div>

    </div>
  );
}

export default RestaurantDashboard;