import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../services/checkoutServices";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function TrackOrder() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
const navigate = useNavigate();
 

 const fetchOrder = async () => {
  try {
    const data = await getOrderById(id);
    setOrder(data);
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  fetchOrder();
}, []);

if (!order) {
  return <h2>Loading...</h2>;
}
  return (
    <div className="track-page">
<button
  className="back-btn"
  onClick={() => navigate("/my-orders")}
>
  <FaArrowLeft />
  <span>Back</span>
</button>

<h1>Track Order</h1>
      

      <h3>Order #{order._id.slice(-6)}</h3>

      <div className="track-card">
        <h4>Restaurant</h4>
        <p>{order.restaurant?.name}</p>
      </div>

      <div className="track-card">
        <h4>Delivery Address</h4>
        <p>{order.address}</p>
      </div>

      <div className="track-card">
        <h4>Payment</h4>
        <p>{order.paymentMethod}</p>
      </div>

      <div className="track-card">
        <h4>Total</h4>
        <p>₹{order.total}</p>
      </div>

      <div className="track-card">
        <h4>Status</h4>
        <p>{order.status}</p>
      </div>

    </div>
  );
}

export default TrackOrder;