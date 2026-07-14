import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useState,useEffect } from "react";
import Container from "react-bootstrap/Container";
import "../styles/Checkout.css";
import { placeOrder } from "../services/checkoutServices";
import { useCart } from "../Context/CartContext";
import {
  FaMapMarkerAlt,
  FaClock,
  FaUser,
  FaCreditCard,
  FaTag,
  FaEdit,
  FaPlus,
  FaLock,
  FaMoneyBillWave,
  FaWallet,
} from "react-icons/fa";

import { MdDeliveryDining } from "react-icons/md";
import { SiGooglepay } from "react-icons/si";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

function Checkout() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [instructions, setInstructions] = useState("");
  const [editingAddress, setEditingAddress] = useState(false);
  const [showAddressInput, setShowAddressInput] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [deliveryType, setDeliveryType] = useState("ASAP");
  const [scheduledDate, setScheduledDate] = useState("");

  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);

  const [loading, setLoading] = useState(false);

  const { cartItems, clearCartState } = useCart();

  const navigate = useNavigate();
useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {

        toast.warning("Please login first!");

        navigate("/auth"); // or "/auth" depending on your route

    }

}, [navigate]);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const deliveryFee = subtotal > 499 ? 0 : 40;

  const total = subtotal + deliveryFee - discount;

 const applyCoupon = () => {

    if (promo === "WELCOME50") {

        setDiscount(50);

        toast.success("₹50 OFF Applied!");

    }

    else if (promo === "FREEDEL") {

        setDiscount(deliveryFee);

        toast.success("Free Delivery Applied!");

    }

    else if (promo === "SAVE20") {

        const save20Discount = Math.min(subtotal * 0.20, 150);

        setDiscount(save20Discount);

        toast.success("20% OFF Applied!");

    }

    else {

        setDiscount(0);

        toast.error("Invalid Coupon!");

    }

};
  const handlePlaceOrder = async () => {
    if (!name.trim()) {
      toast.error("Please enter your name.");

      return;
    }

    if (!phone.trim()) {
      toast.error("Please enter your phone number.");

      return;
    }

    if (!address.trim()) {
      toast.error("Please enter your address.");

      return;
    }

    setLoading(true);

    try {
      await placeOrder({
        name,

        phone,

        address,

        paymentMethod,

        deliveryType,

        scheduledDate,

        instructions,
      });

      clearCartState();

      toast.success("Order Placed Successfully!");

      navigate("/order-success");
    } catch (error) {
      toast.error(error.response?.data?.message || "Checkout Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <div className="checkout-container">
          {/* HERO */}

          <section className="checkout-hero">
            <p className="checkout-breadcrumb">
              Home <span>›</span> Cart <span>›</span> <strong>Checkout</strong>
            </p>

            <h1>Checkout</h1>

            <p className="checkout-subtitle">Complete your order securely.</p>
          </section>

          {/* MAIN LAYOUT */}

          <section className="checkout-layout">
            {/* LEFT SIDE */}

            <div className="checkout-left">
              {/* Delivery Address */}

              <div className="checkout-card">
                <div className="checkout-card-header">
                  <div className="checkout-title">
                    <div className="checkout-icon">
                      <FaMapMarkerAlt />
                    </div>
                    <h3>Delivery Address</h3>
                  </div>

                  <div className="checkout-address-actions">
                    <button
                      className="checkout-edit-btn"
                      onClick={() => setEditingAddress(!editingAddress)}
                    >
                      <FaEdit />
                      <span>Edit</span>
                    </button>

                    <button
                      className="checkout-add-btn"
                      onClick={() => setShowAddressInput(!showAddressInput)}
                    >
                      <FaPlus />
                      <span>Add New</span>
                    </button>
                  </div>
                </div>

             <div className="address-box">

   {editingAddress ? (

<div className="address-form">

    <div className="form-group">
        <label>Full Name</label>

        <input
            type="text"
            value={name}
            onChange={(e)=>setName(e.target.value)}
        />
    </div>

    <div className="form-group">
        <label>Phone Number</label>

        <input
            type="text"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
        />
    </div>

    <div className="form-group">
        <label>Delivery Address</label>

        <textarea
            rows="3"
            value={address}
            onChange={(e)=>setAddress(e.target.value)}
        />
    </div>

    <button
        className="save-address-btn"
        onClick={() => setEditingAddress(false)}
    >
        Save Changes
    </button>

</div>

) : (
        <>
            <h4>{name || "Customer"}</h4>

            <p>{phone || "Phone Number"}</p>

            <p>{address || "Please enter your delivery address"}</p>

            {deliveryType === "SCHEDULED" && (
                <p className="schedule-time">
                    Delivery Time :
                    {scheduledDate || "Not Selected"}
                </p>
            )}
        </>

    )}

   {showAddressInput && (

<div className="new-address-card">

    <h4>Add New Address</h4>

    <div className="new-address-grid">

        <input
            type="text"
            placeholder="Full Name"
        />

        <input
            type="text"
            placeholder="Phone Number"
        />

    </div>

    <textarea
        rows="4"
        placeholder="Enter complete address"
    />

    <button
        className="save-address-btn"
        onClick={() => setShowAddressInput(false)}
    >
        Save Address
    </button>

</div>

)}


</div>
</div>
              {/* Delivery Schedule */}

              <div className="checkout-card">
                <div className="checkout-title">
                  <div className="checkout-icon">
                    <FaClock />
                  </div>

                  <h3>Delivery Schedule</h3>
                </div>

                <div
                  className={`delivery-option ${deliveryType === "ASAP" ? "active" : ""}`}
                  onClick={() => setDeliveryType("ASAP")}
                >
                  <div className="delivery-radio"></div>

                  <div>
                    <h4>Deliver ASAP</h4>

                    <p>Arrives in 25–30 min</p>
                  </div>
                </div>

                <div
                  className={`delivery-option ${deliveryType === "SCHEDULED" ? "active" : ""}`}
                  onClick={() => setDeliveryType("SCHEDULED")}
                >
                  <div className="delivery-radio"></div>

                  <div>
                    <h4>Schedule Delivery</h4>

                    <p>Choose your preferred time</p>
                  </div>
                </div>

                {deliveryType === "SCHEDULED" && (
                  <div className="form-group full-width">
                    <label>Schedule Date & Time</label>

                    <input
                      type="datetime-local"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                    />
                  </div>
                )}
              </div>
                {/* Contact */}

                <div className="checkout-card">
                  <div className="checkout-title">
                    <div className="checkout-icon">
                      <FaUser />
                    </div>

                    <h3>Contact Details</h3>
                  </div>

                  <div className="contact-form-grid">
                    <div className="form-group">
                      <label>Full Name</label>

                      <input
                        type="text"
                        placeholder="Jane Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label>Phone Number</label>

                      <input
                        type="text"
                        placeholder="+91 9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Delivery Address</label>

                      <input
                        type="text"
                        placeholder="Enter delivery address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                    <div className="form-group full-width">
                      <label>Email Address</label>

                      <input
                        type="email"
                        placeholder="jane@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-group full-width">
                      <label>Delivery Instructions (Optional)</label>

                      <textarea
                        rows="4"
                        placeholder="Leave at the front door..."
                        value={instructions}
                        onChange={(e) => setInstructions(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </div>

                {/* Payment */}

                <div className="checkout-card">
                  <div className="payment-header">
                    <div className="checkout-title">
                      <div className="checkout-icon">
                        <FaCreditCard />
                      </div>
                      <h3>Payment Method</h3>
                    </div>

                    <span className="secure-payment">
                      <FaLock />
                      256-bit SSL Secure
                    </span>
                  </div>

                  <div className="payment-options">
                    <div
                      className={`payment-option ${paymentMethod === "Card" ? "active" : ""}`}
                      onClick={() => setPaymentMethod("Card")}
                    >
                      <FaCreditCard className="payment-icon" />
                      <span>Card</span>
                    </div>

                    <div
                      className={`payment-option ${paymentMethod === "Wallet" ? "active" : ""}`}
                      onClick={() => setPaymentMethod("Wallet")}
                    >
                      <FaWallet className="payment-icon" />
                      <span>Wallet</span>
                    </div>

                    <div
                      className={`payment-option ${paymentMethod === "UPI" ? "active" : ""}`}
                      onClick={() => setPaymentMethod("UPI")}
                    >
                      <SiGooglepay className="payment-icon" />
                      <span>UPI</span>
                    </div>

                    <div
                      className={`payment-option ${paymentMethod === "Cash" ? "active" : ""}`}
                      onClick={() => setPaymentMethod("Cash")}
                    >
                      <FaMoneyBillWave className="payment-icon" />
                      <span>Cash</span>
                    </div>
                    <p
                      style={{
                        marginTop: "15px",
                        fontWeight: "600",
                        color: "#ff6b42",
                      }}
                    >
                      Selected Payment :<strong> {paymentMethod}</strong>
                    </p>
                  </div>

                  {paymentMethod === "Card" && (
                    <div className="card-details">
                      <div className="form-group full-width">
                        <label>Card Number</label>

                        <input type="text" placeholder="XXXX XXXX XXXX XXXX" />
                      </div>

                      <div className="form-group">
                        <label>Expiry Date</label>

                        <input type="text" placeholder="MM/YY" />
                      </div>

                      <div className="form-group">
                        <label>CVV</label>

                        <input type="password" placeholder="***" />
                      </div>
                    </div>
                  )}
                </div>

      {/* ================= Promo Section ================= */}

<div className="checkout-card">

  <div className="checkout-title">

    <div className="checkout-icon">
      <FaTag />
    </div>

    <div>
      <h3>Promo Code</h3>
      <p className="promo-subtitle">
        Apply a coupon and save more on your order.
      </p>
    </div>

  </div>

 <div className="promo-input-wrapper">

    <input
        className="promo-input"
        type="text"
        placeholder="Enter promo code"
        value={promo}
        onChange={(e) =>
            setPromo(e.target.value.toUpperCase())
        }
    />

    <button
        className="apply-btn"
        onClick={applyCoupon}
        disabled={!promo}
    >
        Apply
    </button>

</div>

  <h4 className="offers-title">
    Or choose from our best offers
  </h4>

  <div className="promo-grid">

    <div
      className={`promo-offer ${
        promo === "WELCOME50" ? "active" : ""
      }`}
      onClick={() => setPromo("WELCOME50")}
    >
      <span className="offer-icon">🎉</span>

      <h5>WELCOME50</h5>

      <p>Flat ₹50 OFF</p>

      <small>Tap to Apply</small>
    </div>

    <div
      className={`promo-offer ${
        promo === "FREEDEL" ? "active" : ""
      }`}
      onClick={() => setPromo("FREEDEL")}
    >
      <span className="offer-icon">🚚</span>

      <h5>FREEDEL</h5>

      <p>Free Delivery</p>

      <small>Tap to Apply</small>
    </div>

    <div
      className={`promo-offer ${
        promo === "SAVE20" ? "active" : ""
      }`}
      onClick={() => setPromo("SAVE20")}
    >
      <span className="offer-icon">🔥</span>

      <h5>SAVE20</h5>

      <p>20% OFF up to ₹150</p>

      <small>Tap to Apply</small>
    </div>

  </div>

  <p className="promo-note">
    ℹ️ Only one coupon can be applied per order.
  </p>

</div>

            </div>

            {/* RIGHT SIDE */}

            <aside className="checkout-right">
              <div className="order-summary">
                <h2>Order Summary ({cartItems.length} Items)</h2>

                <div className="summary-items">
                  {cartItems.map((item) => (
                    <div
                      className="summary-item"
                      key={item._id || item.productId}
                    >
                      <div>
                        <h4>{item.name}</h4>

                        <span>Qty: {item.quantity}</span>
                      </div>

                      <strong>₹{item.price * item.quantity}</strong>
                    </div>
                  ))}
                </div>

                <hr />

                <div className="price-row">
                  <span>Subtotal</span>

                  <span>₹{subtotal}</span>
                </div>

                <div className="price-row">
                  <span>Delivery Fee</span>

                  <span>₹{deliveryFee}</span>
                </div>

                <div className="price-row">
                  <span>Discount</span>

                  <span className="discount">
                    {discount === 0 ? "₹0" : `-₹${discount}`}
                  </span>
                </div>

                <div className="price-row total">
                  <span>Total</span>

                  <span>₹{total}</span>
                </div>

                <div className="eta-card">
                  <MdDeliveryDining className="eta-icon" />

                  <div>
                    <h4>Estimated Delivery</h4>

                    <p>
                      {deliveryType === "ASAP"
                        ? "25 - 30 Minutes"
                        : scheduledDate || "Not Scheduled"}
                    </p>
                  </div>
                </div>

                <button
                  className="place-order-btn"
                  onClick={handlePlaceOrder}
                  disabled={loading || cartItems.length === 0}
                >
                  {loading ? "Placing Order..." : "Place Order"}
                </button>
              </div>
            </aside>
          </section>
        </div>
      </Container>

      <Footer />
    </>
  );
}

export default Checkout;
