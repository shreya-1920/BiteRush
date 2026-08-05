import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrderById } from "../services/checkoutServices";

import {
  FaArrowLeft,
  FaClipboardCheck,
  FaUtensils,
  FaMotorcycle,
  FaBoxOpen,
} from "react-icons/fa";

function TrackOrder() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);

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

  const statusMap = {
    Pending: 1,
    Confirmed: 2,
    Preparing: 2,
    "Out for Delivery": 3,
    Delivered: 4,
  };

  const step = statusMap[order.status] || 1;


  return (
    <div className="track-page">

      <button
        className="back-btn"
        onClick={() => navigate("/orders")}
      >
        <FaArrowLeft />
        <span>Back</span>
      </button>

      <h1>Track Order</h1>

      <h3>Order #{order._id.slice(-6)}</h3>

      {/* Restaurant */}

      <div className="track-card">
        <h4>Restaurant</h4>
        <p>{order.restaurant?.name}</p>
      </div>

      {/* Address */}

      <div className="track-card">
        <h4>Delivery Address</h4>
        <p>{order.address}</p>
      </div>

      {/* Payment */}

      <div className="track-card">
        <h4>Payment</h4>
        <p>{order.paymentMethod}</p>
      </div>

      {/* Total */}

      <div className="track-card">
        <h4>Total</h4>
        <p>₹{order.total}</p>
      </div>

      {/* Order Progress */}

      <div className="track-card">

        <h4>Order Progress</h4>

        <div className="tracking-wrapper">

          <div className="tracking-line"></div>

         <div
    className="tracking-fill"
    style={{
        width:
            step === 1
                ? "0%"
                : step === 2
                ? "33%"
                : step === 3
                ? "66%"
                : "calc(100% - 210px)"
    }}
></div>

          <div
            className={`tracking-step ${
              step >= 1 ? "active" : ""
            }`}
          >
            <div className="tracking-circle">
              <FaClipboardCheck />
            </div>

            <p>Pending</p>
          </div>

          <div
            className={`tracking-step ${
              step >= 2 ? "active" : ""
            }`}
          >
            <div className="tracking-circle">
              <FaUtensils />
            </div>

            <p>Preparing</p>
          </div>

          <div
            className={`tracking-step ${
              step >= 3 ? "active" : ""
            }`}
          >
            <div className="tracking-circle">
              <FaMotorcycle />
            </div>

            <p>Out for Delivery</p>
          </div>

          <div
            className={`tracking-step ${
              step >= 4 ? "active" : ""
            }`}
          >
            <div className="tracking-circle">
              <FaBoxOpen />
            </div>

            <p>Delivered</p>
          </div>

        </div>

        <div className="status-pill">
          <span>Current Status</span>
          <h3>{order.status}</h3>
        </div>

      </div>

    </div>
  );
}

export default TrackOrder;