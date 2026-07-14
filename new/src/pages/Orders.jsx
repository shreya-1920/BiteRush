import { Link } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";
import "../styles/Orders.css";

const Orders = () => {
  const orders = [];

  return (
    <div className="orders-page">

      <section className="orders-hero">
        <h1>Your Recent Orders</h1>
        <p>Track all your previous BiteRush orders.</p>
      </section>

      {orders.length === 0 && (
        <div className="empty-orders">

          <div className="order-icon">
            <FaClipboardList />
          </div>

          <h2>No Orders Yet</h2>

          <p>
            Your delicious order history will appear here once you place your
            first BiteRush order.
          </p>

          <Link to="/restaurants" className="browse-btn">
            Browse Restaurants
          </Link>

        </div>
      )}

    </div>
  );
};

export default Orders;