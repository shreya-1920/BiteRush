

import {
  FaDollarSign,
  FaClipboardList,
  FaUtensils,
  FaStar,
  FaChevronDown,
  FaChartLine,
  FaStore,
  FaPlus
  
} from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {useSearch} from "../context/SearchContext";

import { getDashboard } from "../services/RestaurantDashboardServices";
import SalesChart from "../components/SalesChart";
import "../styles/Restaurant-panel.css";


function RestaurantDashboard() {
  const [chartFilter, setChartFilter] = useState("week");
   const navigate = useNavigate();
const [dashboard, setDashboard] = useState(null);

const [loading, setLoading] = useState(true);


const { search } = useSearch();
const fetchDashboard = async (filter = "week") => {
    try {
        const data = await getDashboard(filter);
        console.log(data);
        setDashboard(data);
    } catch (error) {
        console.log(error);
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
    fetchDashboard(chartFilter);
}, [chartFilter]);

if (loading) {
    return <h2>Loading...</h2>;
}

if (!dashboard) {
    return <h2>Unable to load dashboard.</h2>;
}
const query = search.toLowerCase();

const filteredPopularDishes = dashboard.popularDishes.filter((dish) =>
    dish.name.toLowerCase().includes(query)
);

const filteredRecentOrders = dashboard.recentOrders.filter((order) =>
    order.name.toLowerCase().includes(query) ||
    order.status.toLowerCase().includes(query) ||
    order._id.slice(-5).toUpperCase().includes(search.toUpperCase())
);
console.log(dashboard);
console.log(dashboard?.salesOverview);
  return (
    
    <div className="rp-dashboard">

      {/* =========================
            HEADER
      ========================== */}

      <div className="rp-dashboard-header">

        <div className="restaurant-banner">

        <div className="restaurant-banner-left">

            <h1>
                Welcome Back, {JSON.parse(localStorage.getItem("restaurant")).name}
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

  {/* Sales */}
  <div className="rp-stat-card">

    <div className="rp-stat-header">

      <div className="rp-stat-icon sales">
        <FaDollarSign />
      </div>

      <span className="rp-stat-title">
        Today's Sales
      </span>

    </div>

    <h2>
      ₹{dashboard.stats.todaySales}
    </h2>

    <div className="rp-stat-footer">
      <span>Today's Revenue</span>
    </div>

  </div>

  {/* Orders */}

<div className="rp-stat-card">

  <div className="rp-stat-header">

    <div className="rp-stat-icon orders">
      <FaClipboardList />
    </div>

    <span className="rp-stat-title">
      Today's Orders
    </span>

  </div>

  <h2>
    {dashboard.stats.todayOrders}
  </h2>

  <div className="rp-stat-footer">
    <span>{dashboard.stats.pendingOrders} Pending</span>
  </div>

</div>
  {/* Menu */}

  <div className="rp-stat-card">

    <div className="rp-stat-header">

      <div className="rp-stat-icon menu">
        <FaUtensils />
      </div>

      <span className="rp-stat-title">
        Menu Items
      </span>

    </div>

    <h2>
      {dashboard.stats.totalMenuItems}
    </h2>

    <div className="rp-stat-footer">
      <span>{dashboard.stats.availableDishes} Available</span>
    </div>

  </div>

  {/* Available */}

  <div className="rp-stat-card">

    <div className="rp-stat-header">

      <div className="rp-stat-icon rating">
        <FaStar />
      </div>

      <span className="rp-stat-title">
        Available Dishes
      </span>

    </div>

    <h2>
      {dashboard.stats.availableDishes}
    </h2>

    <div className="rp-stat-footer">
      <span>
        {dashboard.stats.totalMenuItems -
          dashboard.stats.availableDishes}
        {" "}Unavailable
      </span>
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

           <p>Track your restaurant revenue trends</p>

        </div>
<div className="rp-filter">

    <FaCalendarAlt className="rp-filter-icon"/>

    <select
        value={chartFilter}
        onChange={(e)=>setChartFilter(e.target.value)}
    >
        <option value="day">Per Day</option>
        <option value="week">This Week</option>
        <option value="month">This Month</option>
    </select>
<FaChevronDown className="rp-arrow" />
</div>

    </div>

 <div className="rp-sales-chart">

    <SalesChart
        data={dashboard.salesOverview}
        xKey="label"
        dataKey="sales"
    />

</div>
</div>
        {/* Popular Dishes */}
<div className="rp-popular-card">

    <div className="rp-card-header">

        <h3>Popular Dishes</h3>

    </div>



     <div className="rp-popular-list">

{
dashboard.popularDishes.length > 0 ? (

filteredPopularDishes.map((dish,index)=>(

<div
    key={index}
    className="rp-popular-item"
>
    <img
        src={dish.image || "/food-placeholder.png"}
        alt={dish.name}
        className="rp-popular-img"
    />

    <div className="rp-popular-info">

        <h4>{dish.name}</h4>

        <span>{dish.orders} Orders</span>

    </div>

    <div className="rp-hot-badge">

        🔥

    </div>

</div>



))

):(

<div className="rp-empty">

{search
    ? "No matching dishes found."
    : "No popular dishes yet."}

</div>

)

}

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

        <button   onClick={() => navigate("/restaurant/orders")}>View All</button>

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

        {dashboard.recentOrders.length > 0 ? (
filteredRecentOrders.map((order) => (

                <tr key={order._id}>

                    <td>
                        <strong>#{order._id.slice(-5)}</strong>
                    </td>

                    <td>
                        <div className="rp-customer">

                            <div className="rp-avatar-small">
                                {order.name?.charAt(0).toUpperCase()}
                            </div>

                            <div>
                                <h5>{order.name}</h5>
                                <span>{order.email}</span>
                            </div>

                        </div>
                    </td>

                    <td>₹{order.total}</td>

                    <td>
                        <span
                            className={`rp-status ${
                                order.status.toLowerCase().replace(/\s/g, "-")
                            }`}
                        >
                            {order.status}
                        </span>
                    </td>

                </tr>

            ))

        ) : (

            <tr>
                <td colSpan={4} style={{ textAlign: "center" }}>
                   {search
    ? "No matching orders found."
    : "No recent orders found."}
                </td>
            </tr>

        )}

    </tbody>

</table>

</div>
  {/* Quick Actions */}
<div className="rp-actions-card">

    <div className="rp-card-header">
        <h3>Quick Actions</h3>
    </div>

    <div className="rp-actions-list">

        <button className="rp-action-btn" onClick={() => navigate("/restaurant/menu")}>
            <FaPlus />
            <span>Add New Dish</span>
        </button>

        <button className="rp-action-btn" onClick={() => navigate("/restaurant/orders")}>
            <FaClipboardList />
            <span>View Orders</span>
        </button>

        <button className="rp-action-btn"  onClick={() => navigate("/restaurant/analytics")}>
            <FaChartLine />
            <span>View Analytics</span>
        </button>

        <button className="rp-action-btn" onClick={() => navigate("/restaurant/profile")}>
            <FaStore />
            <span>Edit Restaurant</span>
        </button>

    </div>

</div>

</div>
</div>
    

    
  );
}

export default RestaurantDashboard;