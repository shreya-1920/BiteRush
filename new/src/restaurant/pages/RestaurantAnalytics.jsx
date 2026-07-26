import {
  FaRupeeSign,
  FaClipboardList,
  FaUsers,
  FaStar,
  FaFire,
} from "react-icons/fa";

import "../styles/Restaurant-panel.css";

function RestaurantAnalytics() {

  const topDishes = [
    {
      name: "Farmhouse Pizza",
      orders: 120,
    },
    {
      name: "Cheese Burger",
      orders: 98,
    },
    {
      name: "White Sauce Pasta",
      orders: 82,
    },
    {
      name: "Paneer Tikka",
      orders: 76,
    },
  ];

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

      <div className="ra-stats">

        <div className="ra-card">

          <FaRupeeSign />

          <h2>₹2,48,500</h2>

          <span>Total Sales</span>

        </div>

        <div className="ra-card">

          <FaClipboardList />

          <h2>845</h2>

          <span>Total Orders</span>

        </div>

        <div className="ra-card">

          <FaUsers />

          <h2>615</h2>

          <span>Customers</span>

        </div>

        <div className="ra-card">

          <FaStar />

          <h2>4.8</h2>

          <span>Average Rating</span>

        </div>

      </div>

      {/* Chart */}

      <div className="ra-chart-card">

        <div className="ra-title">

          <h3>Sales Overview</h3>

          <button>This Month</button>

        </div>

        <div className="ra-chart">

          <FaFire />

          <h2>Sales Chart</h2>

          <p>
            Recharts graph will be added here.
          </p>

        </div>

      </div>

      {/* Bottom */}

      <div className="ra-bottom">

        <div className="ra-dishes">

          <div className="ra-title">

            <h3>Top Selling Dishes</h3>

          </div>

          {

            topDishes.map((dish,index)=>(

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

          <p>🔥 Peak Hour : 8 PM</p>

          <p>🍕 Best Category : Pizza</p>

          <p>⭐ Rating : 4.8 / 5</p>

          <p>📦 Pending Orders : 12</p>

        </div>

      </div>

    </div>

  );

}

export default RestaurantAnalytics;