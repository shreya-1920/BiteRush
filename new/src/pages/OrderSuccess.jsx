import {
  FaCheckCircle,
  FaMotorcycle,
  FaHome,
  FaCreditCard,
  FaReceipt,
  FaUtensils,
  FaTruck,
  FaBoxOpen,
  FaShoppingBag,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/OrderSuccess.css"
import scooterImage from "../assets/images/order-scooter.png";
export default function OrderSuccess() {

  const navigate = useNavigate();

 const orderId = "BR48291";

  return (

    <section className="success-page">

      <div className="success-card">

        {/* Hero */}

        <div className="success-hero">

         <img
    src={scooterImage}
    alt="Delivery Scooter"
    className="success-image"
/>
          <div className="success-badge">
            <FaCheckCircle />
          </div>

          <h1>Order Placed Successfully!</h1>

          <p>
            Thank you for ordering with
            <span> BiteRush</span>.
            <br />
            Your delicious meal is now being prepared.
          </p>

        </div>


        {/* Order Details */}

        <div className="order-details-card">

          <div className="details-heading">
            <FaReceipt />
            <h3>Order Details</h3>
          </div>

          <div className="details-grid">

            <div className="detail-box">

              <FaShoppingBag />

              <div>

                <small>Order ID</small>

                <h4>{orderId}</h4>

              </div>

            </div>

            <div className="detail-box">

              <FaMotorcycle />

              <div>

                <small>Estimated Delivery</small>

                <h4>25 - 30 mins</h4>

              </div>

            </div>

            <div className="detail-box">

              <FaHome />

              <div>

                <small>Deliver To</small>

                <h4>Home</h4>

              </div>

            </div>

            <div className="detail-box">

              <FaCreditCard />

              <div>

                <small>Payment</small>

                <h4>Paid via UPI</h4>

              </div>

            </div>

          </div>

        </div>


        {/* Delivery Progress */}

        <div className="delivery-progress">

          <div className="progress-step active">

            <div className="progress-icon">

              <FaCheckCircle />

            </div>

            <p>Order Confirmed</p>

          </div>

          <div className="progress-line"></div>

          <div className="progress-step">

            <div className="progress-icon">

              <FaUtensils />

            </div>

            <p>Preparing Food</p>

          </div>

          <div className="progress-line"></div>

          <div className="progress-step">

            <div className="progress-icon">

              <FaTruck />

            </div>

            <p>Out For Delivery</p>

          </div>

          <div className="progress-line"></div>

          <div className="progress-step">

            <div className="progress-icon">

              <FaBoxOpen />

            </div>

            <p>Delivered</p>

          </div>

        </div>


        {/* Buttons */}

        <div className="success-buttons">

          <button
            className="track-btn"
          >
            Track Order
          </button>

          <button
            className="continue-btn"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>

        </div>


        {/* Thank You */}

        <div className="thank-you-card">

          <div className="heart">

            ❤️

          </div>

          <div>

            <h3>
              Thank you for choosing BiteRush.
            </h3>

            <p>
              We hope you enjoy your meal!
            </p>

          </div>

        </div>

      </div>

    </section>

  );

}