import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaClipboardList } from "react-icons/fa";
import { getMyOrders } from "../services/checkoutServices";
import "../styles/Orders.css";

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {

            const data = await getMyOrders();
            console.log(data);

            setOrders(data);

        } catch (err) {

            console.log(err);

        } finally {

            setLoading(false);

        }
    };

    if (loading) {
        return <h2 style={{ textAlign: "center" }}>Loading...</h2>;
    }

    return (
        <div className="orders-page">

            <section className="orders-hero">
                <h1>Your Recent Orders</h1>
                <p>Track all your previous BiteRush orders.</p>
            </section>

            {orders.length === 0 ? (

                <div className="empty-orders">

                    <div className="order-icon">
                        <FaClipboardList />
                    </div>

                    <h2>No Orders Yet</h2>

                    <p>
                        Your delicious order history will appear here once you place your first BiteRush order.
                    </p>

                    <Link to="/restaurants" className="browse-btn">
                        Browse Restaurants
                    </Link>

                </div>

            ) : (

                <div className="orders-list">

                    <div className="orders-list">

  {orders.map((order) => (

    <div className="order-card" key={order._id}>

      <div className="order-header">

        <div>
          <h3>Order #{order._id.slice(-6)}</h3>
          <span className="order-date">
            {new Date(order.createdAt).toLocaleString()}
          </span>
        </div>

        <div className="order-status">
          Delivered
        </div>

      </div>

      <div className="order-items">

        {order.items.map((item) => (

          <div className="order-item" key={item._id}>

            <img
              src={item.image}
              alt={item.name}
            />

            <div>

              <h4>{item.name}</h4>

              <p>Qty : {item.quantity}</p>

            </div>

            <strong>₹{item.price}</strong>

          </div>

        ))}

      </div>

      <div className="order-footer">

        <div>
          <strong>Total :</strong> ₹{order.total}
        </div>

        <div>
          <strong>Payment :</strong> {order.paymentMethod}
        </div>

      </div>

    </div>

  ))}

</div>

                </div>

            )}

        </div>
    );
};

export default Orders;