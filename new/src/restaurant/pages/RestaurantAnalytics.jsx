import {
  FaRupeeSign,
  FaClipboardList,
  FaUsers,
  FaStar,
  FaFire,
} from "react-icons/fa";
import SalesChart from "../components/SalesChart";
import { useEffect, useState } from "react";
import { getAnalytics } from "../services/RestaurantAnalyticsServices";
import "../styles/Restaurant-panel.css";

function RestaurantAnalytics() {
const [chartFilter, setChartFilter] = useState("week");
  const [analytics, setAnalytics] = useState(null);

const [loading, setLoading] = useState(true);
const fetchAnalytics = async (filter = "week") => {

    try {

        const data = await getAnalytics(filter);

        setAnalytics(data);

    } catch (err) {

        console.log(err);

    } finally {

        setLoading(false);

    }

};
useEffect(() => {
    fetchAnalytics(chartFilter);
}, [chartFilter]);

if (loading) {
    return <h2>Loading Analytics...</h2>;
}

  return (

    <div className="ra-page">

      {/* Header */}

      <div className="ra-header">

        <div>

          <h1>Analytics</h1>

          <p>
            Restaurant performance overview.
          </p>

        </div>

      </div>

      {/* Stats */}

{/* Stats */}

<div className="ra-stats">

  <div className="ra-card">

    <div className="ra-icon sales">
      <FaRupeeSign />
    </div>

    <div className="ra-info">
      <p>Total Sales</p>
      <h2>₹{analytics.stats.totalSales.toLocaleString()}</h2>
    </div>

  </div>

  <div className="ra-card">

    <div className="ra-icon orders">
      <FaClipboardList />
    </div>

    <div className="ra-info">
      <p>Total Orders</p>
      <h2>{analytics.stats.totalOrders}</h2>
    </div>

  </div>

  <div className="ra-card">

    <div className="ra-icon customers">
      <FaUsers />
    </div>

    <div className="ra-info">
      <p>Customers</p>
      <h2>{analytics.stats.totalCustomers}</h2>
    </div>

  </div>

  <div className="ra-card">

    <div className="ra-icon rating">
      <FaStar />
    </div>

    <div className="ra-info">
      <p>Average Rating</p>
      <h2>{analytics.stats.averageRating.toFixed(1)}</h2>
    </div>

  </div>

</div>
      {/* Chart */}

      <div className="ra-chart-card">

        <div className="ra-title">

          <h3>Sales Overview</h3>

         <select
    value={chartFilter}
    onChange={(e)=>setChartFilter(e.target.value)}
>
    <option value="day">Per Day</option>
    <option value="week">This Week</option>
    <option value="month">This Month</option>
</select>

        </div>
<div className="ra-chart">

{analytics.salesChart.length > 0 ? (

<SalesChart
    data={analytics.salesChart}
    xKey="label"
    dataKey="sales"
/>

) : (

<div className="ra-empty-chart">

    <FaFire/>

    <h3>No Sales Data</h3>

    <p>
        Sales chart will appear after delivered orders.
    </p>

</div>

)}

</div>

      {/* Bottom */}

      <div className="ra-bottom">

        <div className="ra-dishes">

          <div className="ra-title">

            <h3>Top Selling Dishes</h3>

          </div>

          {

        analytics.topDishes.map((dish,index)=>(
    <div
        key={index}
        className="ra-dish"
    >

        <span>{dish.name}</span>

        <strong>
            {dish.orders} Orders
        </strong>

    </div>
))

          }

        </div>

        <div className="ra-summary">

          <div className="ra-title">

            <h3>Today's Summary</h3>

          </div>

          <p>🔥 Peak Hour : {analytics.todaySummary.peakHour}</p>

          <p>🍕 Best Category : {analytics.todaySummary.bestCategory}</p>

          <p>⭐ Rating : {analytics.stats.averageRating.toFixed(1)} / 5</p>

          <p>📦 Pending Orders : {analytics.todaySummary.pendingOrders}</p>

        </div>

      </div>

    </div>
</div>
  );

}

export default RestaurantAnalytics;