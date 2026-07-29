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

  const interval = setInterval(() => {
    fetchOrder();
  }, 15000);

  return () => clearInterval(interval);
}, [id]);
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

<h4>Order Progress</h4>

<div
  className="track-progress"
  style={{
    "--progress":
      order.status === "Pending"
        ? "0%"
        : order.status === "Preparing"
        ? "33%"
        : order.status === "Out for Delivery"
        ? "66%"
        : "100%",
  }}
>

<div className={`track-step ${
order.status === "Pending" ||
order.status === "Preparing" ||
order.status === "Out for Delivery" ||
order.status === "Delivered"
? "active" : ""
}`}>

<div className="track-circle"></div>

<p>Pending</p>

</div>

<div className={`track-step ${
order.status === "Preparing" ||
order.status === "Out for Delivery" ||
order.status === "Delivered"
? "active" : ""
}`}>

<div className="track-circle"></div>

<p>Preparing</p>

</div>

<div className={`track-step ${
order.status === "Out for Delivery" ||
order.status === "Delivered"
? "active" : ""
}`}>

<div className="track-circle"></div>

<p>Out for Delivery</p>

</div>

<div className={`track-step ${
order.status === "Delivered"
? "active" : ""
}`}>

<div className="track-circle"></div>

<p>Delivered</p>

</div>

</div>

<h3 className="current-status">
Current Status: {order.status}
</h3>

</div>
 

  
  </div>

  );
}

export default TrackOrder;