import Header from "../Components/Header";
import Footer from "../Components/Footer";

import Container from "react-bootstrap/Container";
import "../styles/Checkout.css";
import {
  FaCreditCard,
  FaWallet,
  FaQrcode,
  FaMoneyBillWave,
  FaShieldAlt,
} from "react-icons/fa";
function Checkout() {
  return (
    <>
      <Header />

      <section className="checkout-page">
        <Container>
          <div className="checkout-header">
            <p className="checkout-breadcrumb">
              Home
              <span>›</span>
              Cart
              <span>›</span>
              <span className="active">Checkout</span>
            </p>

            <h1>Checkout</h1>

            <p className="checkout-subtitle">Complete your order securely.</p>
          </div>

          <div className="checkout-container">
            <div className="checkout-left">
             <div className="checkout-card">

  <div className="address-header">

    <div className="checkout-title">



    <span className="address-icon">📍</span>

    <h3>Delivery Address</h3>

  </div>

  <div className="address-actions">

  

   <div
  style={{
    display: "flex",
    gap: "20px",
    border: "2px solid red",
  }}
>
  <span>Edit</span>
  <span style={{ color: "red" }}>+ Add New</span>
</div>

  </div>

</div>

  <div className="address-box">

    <h4>Jane Doe</h4>

    <p>+91 9876543210</p>

    <p>221B Baker Street, Jaipur, Rajasthan</p>

  </div>

</div>
<div className="checkout-card">

  <h3 className="section-heading">
    🕒 Delivery Schedule
  </h3>

  <div className="schedule-grid">

    <label className="schedule-card active">

      <input
        type="radio"
        name="delivery"
        defaultChecked
      />

      <div className="schedule-content">
        <h4>Deliver ASAP</h4>
        <p>Arrives in 25–30 min</p>
      </div>

    </label>

    <label className="schedule-card">

      <input
        type="radio"
        name="delivery"
      />

      <div className="schedule-content">
        <h4>Schedule Delivery</h4>
        <p>Pick a later date/time</p>
      </div>

    </label>

  </div>

</div>
<div className="checkout-card">

  <h3 className="section-heading">
    👤 Contact Details
  </h3>

  <div className="form-grid">

    <div>

      <label>Full Name</label>

      <input
        type="text"
        placeholder="Jane Doe"
      />

    </div>

    <div>

      <label>Phone Number</label>

      <input
        type="text"
        placeholder="+91 9876543210"
      />

    </div>

  </div>

  <label>Email Address</label>

  <input
    type="email"
    placeholder="jane@example.com"
  />

  <label>Delivery Instructions (Optional)</label>

  <textarea
    rows="4"
    placeholder="Leave at the door..."
  />

</div>
<div className="checkout-card">

  <div className="payment-header">

    <h3>
      <FaCreditCard />
      Payment Method
    </h3>

    <span>

      <FaShieldAlt />

      256-bit SSL Secure

    </span>

  </div>

  <div className="payment-tabs">

    <button className="payment-tab active">

      <FaCreditCard />

      <span>Card</span>

    </button>

    <button className="payment-tab">

      <FaWallet />

      <span>Wallet</span>

    </button>

    <button className="payment-tab">

      <FaQrcode />

      <span>UPI</span>

    </button>

    <button className="payment-tab">

      <FaMoneyBillWave />

      <span>Cash</span>

    </button>

  </div>

  <div className="card-form">

    <label>Card Number</label>

    <input
      type="text"
      placeholder="XXXX XXXX XXXX XXXX"
    />

    <div className="card-grid">

      <div>

        <label>Expiry Date</label>

        <input
          type="text"
          placeholder="MM/YY"
        />

      </div>

      <div>

        <label>CVV</label>

        <input
          type="password"
          placeholder="***"
        />

      </div>

    </div>

  </div>

</div>
<div className="checkout-card">

  <h3 className="section-heading">

    🏷 Apply Promo Code

  </h3>

  <div className="promo-row">

    <input
      type="text"
      placeholder="ENTER PROMO CODE"
    />

    <button>

      Apply

    </button>

  </div>

  <div className="promo-tags">

    <span>BITE100</span>

    <span>FREEDEL</span>

    <span>SAVE50</span>

  </div>

</div>

{/*right*/}
</div>

            <div className="checkout-right">

              <div className="checkout-item">

        <img
            src="https://images.unsplash.com/photo-1576107232684-1279f390859f?w=200"
            alt=""
        />

        <div>

            <h4>Loaded Fries</h4>

            <p>Qty: 1</p>

        </div>

        <span>₹199</span>

    </div>

    <hr />

    <div className="summary-row">
        <span>Subtotal</span>
        <span>₹797</span>
    </div>

    <div className="summary-row">
        <span>Delivery Fee</span>
        <span className="free">FREE</span>
    </div>

    <div className="summary-row">
        <span>GST</span>
        <span>₹54</span>
    </div>

    <div className="summary-row discount">
        <span>Discount</span>
        <span>-₹120</span>
    </div>

    <hr />

    <div className="grand-total">

        <h3>Total</h3>

        <h3>₹731</h3>

    </div>
<div className="eta-card">

    <p>Estimated Arrival</p>

    <h2>25–30 min</h2>

    <span>🚚 Track your order in real time</span>

</div>
<button className="place-order-btn">
    🔒 Place Order
</button>

<p className="terms">
    By placing the order, you agree to our Terms & Privacy Policy.
</p>
</div>


</div>
    
        </Container>
      </section>

      <Footer />
    </>
  );
}

export default Checkout;
