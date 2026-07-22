import {
 FaClipboardList,
 FaMoneyBillWave,
  FaUtensils ,
  FaUsers,
  
FaCheckCircle,
FaShoppingBag
} from "react-icons/fa";
import "../styles/statCard.css";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const navigate = useNavigate();


  return (
    <div className="dashboard">

      {/* Welcome Banner */}
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

        <p><strong>12</strong> New Orders</p>

        <p><strong>3</strong> Restaurant Requests</p>

    </div>

</div>

      {/* Stats */}

   <div className="admin-stats-grid">

  {[
    {
      icon: <FaClipboardList />,
      title: "TOTAL ORDERS",
      value: "1,284",
      change: "+12%",
      className: "orders",
    },
    {
      icon: <FaMoneyBillWave />,
      title: "REVENUE",
      value: "$42.5k",
      change: "+8.4%",
      className: "revenue",
    },
    {
      icon: <FaUsers />,
      title: "CUSTOMERS",
      value: "8,902",
      change: "+24%",
      className: "customers",
    },
    {
      icon: <FaUtensils />,
      title: "RESTAURANTS",
      value: "142",
      change: "Stable",
      className: "restaurants",
    },
    {
      icon: <FaShoppingBag />,
      title: "PENDING",
      value: "18",
      change: "High",
      className: "pending",
    },
    {
      icon: <FaCheckCircle />,
      title: "DELIVERED",
      value: "1,210",
      change: "98%",
      className: "delivered",
    },
  ].map((card, index) => (

    <div className="admin-stat-card" key={index}>

      <div className="admin-stat-header">

        <div className={`admin-stat-icon ${card.className}`}>
          {card.icon}
        </div>

        <span className="admin-stat-change">
          {card.change}
        </span>

      </div>

      <div className="admin-stat-body">

    <p className="admin-stat-title">
        {card.title}
    </p>

    <h2 className="admin-stat-value">
        {card.value}
    </h2>

</div>

    </div>

  ))}

</div>
      {/* Main Grid */}

      <div className="dashboard-grid">

        {/* Left Side */}

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

    <div className="chart-grid">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>

    <div className="bars">

      <div className="bar-box">
        <div className="chart-bar h1"></div>
        <p>Mon</p>
      </div>

      <div className="bar-box">
        <div className="chart-bar h2"></div>
        <p>Tue</p>
      </div>

      <div className="bar-box">
        <div className="chart-bar h3"></div>
        <p>Wed</p>
      </div>

      <div className="bar-box">
        <div className="chart-bar h4 active"></div>
        <p>Thu</p>
      </div>

      <div className="bar-box">
        <div className="chart-bar h5"></div>
        <p>Fri</p>
      </div>

      <div className="bar-box">
        <div className="chart-bar h6"></div>
        <p>Sat</p>
      </div>

      <div className="bar-box">
        <div className="chart-bar h2"></div>
        <p>Sun</p>
      </div>

    </div>

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

               <tr
    onClick={() => navigate("/admin/orders")}
    style={{ cursor: "pointer" }}
>

                  <td className="order-id">#1001</td>

                  <td>

                    <div className="customer-info">

                      <div className="customer-avatar">
                        R
                      </div>

                      <div>

                        <div className="customer-name">
                          Rahul
                        </div>

                        <div className="customer-email">
                          rahul@gmail.com
                        </div>

                      </div>

                    </div>

                  </td>

                  <td className="order-price">$42</td>

                  <td>
                    <span className="status delivered">
                      Delivered
                    </span>
                  </td>

                </tr>

                <tr
    onClick={() => navigate("/admin/orders")}
    style={{ cursor: "pointer" }}
>

                  <td className="order-id">#1002</td>

                  <td>

                    <div className="customer-info">

                      <div className="customer-avatar">
                        P
                      </div>

                      <div>

                        <div className="customer-name">
                          Priya
                        </div>

                        <div className="customer-email">
                          priya@gmail.com
                        </div>

                      </div>

                    </div>

                  </td>

                  <td className="order-price">$18</td>

                  <td>
                    <span className="status pending">
                      Pending
                    </span>
                  </td>

                </tr>

                <tr
    onClick={() => navigate("/admin/orders")}
    style={{ cursor: "pointer" }}
>

                  <td className="order-id">#1003</td>

                  <td>

                    <div className="customer-info">

                      <div className="customer-avatar">
                        A
                      </div>

                      <div>

                        <div className="customer-name">
                          Amit
                        </div>

                        <div className="customer-email">
                          amit@gmail.com
                        </div>

                      </div>

                    </div>

                  </td>

                  <td className="order-price">$31</td>

                  <td>
                    <span className="status preparing">
                      Preparing
                    </span>
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

        {/* Right Side */}

        <div className="dashboard-right">

          <div className="admin-card quick-actions-card">

            <h3> Quick Actions</h3>

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

          <div className="admin-card top-restaurants-card">

  <div className="section-header">
    <h3>Top Restaurants</h3>
  </div>

  <div className="restaurant-list">

    <div
    className="restaurant-item"
    onClick={() => navigate("/admin/restaurants")}
    style={{ cursor: "pointer" }}
>
      <div className="restaurant-left">
        <div className="restaurant-avatar">🍕</div>

        <div className="restaurant-details">
          <h4>La Pinoz</h4>
          <span>Pizza • Jaipur</span>
        </div>
      </div>

      <div className="restaurant-sales">$4,200</div>
    </div>

    <div
    className="restaurant-item"
    onClick={() => navigate("/admin/restaurants")}
    style={{ cursor: "pointer" }}
>
      <div className="restaurant-left">
        <div className="restaurant-avatar">🍔</div>

        <div className="restaurant-details">
          <h4>Burger Farm</h4>
          <span>Burgers • Jaipur</span>
        </div>
      </div>

      <div className="restaurant-sales">$3,650</div>
    </div>

    <div
    className="restaurant-item"
    onClick={() => navigate("/admin/restaurants")}
    style={{ cursor: "pointer" }}
>
      <div className="restaurant-left">
        <div className="restaurant-avatar">🍜</div>

        <div className="restaurant-details">
          <h4>Noodles Hub</h4>
          <span>Chinese • Jaipur</span>
        </div>
      </div>

      <div className="restaurant-sales">$2,900</div>
    </div>

  </div>

</div>

          <div className="admin-card latest-customers-card">

  <div className="section-header">
    <h3>Latest Customers</h3>
  </div>

  <div className="customer-list">

   <div
    className="customer-item"
    onClick={() => navigate("/admin/customers")}
    style={{ cursor: "pointer" }}
>
      <div className="customer-left">

        <div className="customer-photo">R</div>

        <div className="customer-meta">
          <h4>Rahul</h4>
          <p>rahul@gmail.com</p>
        </div>

      </div>

      <div className="join-date">Today</div>
    </div>

   <div
    className="customer-item"
    onClick={() => navigate("/admin/customers")}
    style={{ cursor: "pointer" }}
>
      <div className="customer-left">

        <div className="customer-photo">P</div>

        <div className="customer-meta">
          <h4>Priya</h4>
          <p>priya@gmail.com</p>
        </div>

      </div>

      <div className="join-date">Yesterday</div>
    </div>

   <div
    className="customer-item"
    onClick={() => navigate("/admin/customers")}
    style={{ cursor: "pointer" }}
>
      <div className="customer-left">

        <div className="customer-photo">A</div>

        <div className="customer-meta">
          <h4>Amit</h4>
          <p>amit@gmail.com</p>
        </div>

      </div>

      <div className="join-date">2 days ago</div>
    </div>

   <div
    className="customer-item"
    onClick={() => navigate("/admin/customers")}
    style={{ cursor: "pointer" }}
>
      <div className="customer-left">

        <div className="customer-photo">S</div>

        <div className="customer-meta">
          <h4>Shivam</h4>
          <p>shivam@gmail.com</p>
        </div>

      </div>

      <div className="join-date">3 days ago</div>
    </div>

  </div>

</div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;