import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useState,useEffect } from "react";
import Container from "react-bootstrap/Container";
import "../styles/Checkout.css";
import { placeOrder } from "../services/checkoutServices";
import { useCart } from "../Context/CartContext";
import { clearCart } from "../services/cartServices";
import { getProfile } from "../services/AuthServices";
import {
  saveAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
} from "../services/addressServices";
import {
  FaMapMarkerAlt,
  FaClock,
  FaUser,
  FaCreditCard,
  FaTag,
  
  FaPlus,
  FaLock,
  FaMoneyBillWave,
  FaWallet,
} from "react-icons/fa";
import {
  getAvailableCoupons,
  applyCoupon as applyCouponAPI,
} from "../services/couponServices";
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
 

  const [paymentMethod, setPaymentMethod] = useState("Cash");
  const [deliveryType, setDeliveryType] = useState("ASAP");
  const [scheduledDate, setScheduledDate] = useState("");
const [appliedCoupon, setAppliedCoupon] = useState("");
  const [promo, setPromo] = useState("");
  const [discount, setDiscount] = useState(0);
const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
const [addresses, setAddresses] = useState([]);

const [showAddressForm, setShowAddressForm] = useState(false);

const [addressForm, setAddressForm] = useState({
    fullName: "",
    phone: "",
    address: "",
});
  const { cartItems, clearCartState } = useCart();

  const navigate = useNavigate();
  useEffect(() => {
  const fetchCoupons = async () => {
    try {
      const data = await getAvailableCoupons();
      setCoupons(data);
    } catch (err) {
      console.log(err);
    }
  };

  fetchCoupons();
}, []);
useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {

        toast.warning("Please login first!");

        navigate("/auth"); // or "/auth" depending on your route

    }

}, [navigate]);
useEffect(() => {

    const fetchProfile = async () => {

        try {

            const res = await getProfile();

            const user = res.data.user;

            setName(user.name);
            setEmail(user.email);
            setPhone(user.phone || "");

        } catch (err) {

            console.log(err);

        }

    };

    fetchProfile();

}, []);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const deliveryFee = subtotal > 499 ? 0 : 40;

  const total = subtotal + deliveryFee - discount;

 const applyCoupon = async () => {
  try {
    const data = await applyCouponAPI(promo, subtotal);

    setAppliedCoupon(data.coupon);
    setDiscount(data.discount);

    toast.success(`${data.coupon} Applied!`);
  } catch (err) {
    setAppliedCoupon("");
    setDiscount(0);

    toast.error(
      err.response?.data?.message || "Invalid Coupon"
    );
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
const response = await placeOrder({
  restaurant: cartItems[0]?.restaurant,
  name,
  phone,
  address,
  paymentMethod,
  items: cartItems.map((item) => ({
  menuItem: item.productId,   // <-- IMPORTANT
  name: item.name,
  image: item.image,
  price: item.price,
  quantity: item.quantity,
})),
  subtotal,
  deliveryFee,
  discount,
  total,
});

await clearCart();      // Clear MongoDB cart
clearCartState();       // Clear React state

toast.success("Order Placed Successfully!");

navigate("/order-success", {
  state: {
    order: response.order,
  },
});
    
    } catch (error) {
      toast.error(error.response?.data?.message || "Checkout Failed");
    } finally {
      setLoading(false);
    }
  };
const fetchAddresses = async () => {

    try {

        const res = await getAddresses();

        setAddresses(res.data.addresses);
if (res.data.addresses.length > 0) {

    const latest = res.data.addresses[0];

    setName(latest.fullName);
    setPhone(latest.phone);
    setAddress(latest.address);
}
    }

    catch(err){

        console.log(err);

    }

};

useEffect(() => {

    fetchAddresses();

}, []);
const handleSaveAddress = async () => {
    try {

        const res = await saveAddress(addressForm);

        toast.success("Address Saved!");

        fetchAddresses();

        // Update checkout fields
        setName(addressForm.fullName);
        setPhone(addressForm.phone);
        setAddress(addressForm.address);

        setShowAddressForm(false);

        setAddressForm({
            fullName: "",
            phone: "",
            address: "",
        });

    } catch (err) {

        console.log(err);

        toast.error("Failed to save address.");
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


{/* Delivery Address */}

<div className="checkout-card">

    <div className="checkout-card-header">

 <div className="checkout-title">

    <div className="checkout-icon">
        <FaMapMarkerAlt />
    </div>

    <div>

        <h3>Delivery Address</h3>

        <p className="address-subtitle">
            Select a saved address or add a new one.
        </p>

    </div>

</div>
</div>

    <div className="address-box">

        {addresses.length === 0 ? (

          <div className="empty-address">

    <h4>📍 No saved addresses</h4>

    <p>
        Save your first delivery address to checkout faster.
    </p>

</div>

        ) : (

            <div className="address-list">

                {addresses.map((item) => (

                    <div
                        key={item._id}
                        className={`address-card ${
                            address === item.address ? "selected" : ""
                        }`}
                        onClick={() => {
                            setName(item.fullName);
                            setPhone(item.phone);
                            setAddress(item.address);
                        }}
                    >

                        <div className="address-top">

                            <h4>
                                🏠 {item.label || "Home"}
                            </h4>

                            {address === item.address && (

                                <span className="address-badge">

                                    ✓ Selected

                                </span>

                            )}

                        </div>

                        <p className="address-name">

                            {item.fullName}

                        </p>

                        <p>{item.phone}</p>

                        <p>{item.address}</p>

                        <div className="address-actions">

                            <button
                                className="edit-btn"
                                type="button"
                            >
                                ✏ Edit
                            </button>

                            <button
                                className="delete-btn"
                                type="button"
                            >
                                🗑 Delete
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        )}

        <button
            type="button"
            className="add-address-button"
            onClick={() => setShowAddressForm(!showAddressForm)}
        >

            <FaPlus />

            <span>Add New Address</span>

        </button>

        {showAddressForm && (

            <div className="new-address-card">

                <h3>Add New Address</h3>

                <div className="form-group">

                    <label>Full Name</label>

                    <input
                        type="text"
                        value={addressForm.fullName}
                        onChange={(e) =>
                            setAddressForm({
                                ...addressForm,
                                fullName: e.target.value,
                            })
                        }
                    />

                </div>

                <div className="form-group">

                    <label>Phone Number</label>

                    <input
                        type="text"
                        value={addressForm.phone}
                        onChange={(e) =>
                            setAddressForm({
                                ...addressForm,
                                phone: e.target.value,
                            })
                        }
                    />

                </div>

                <div className="form-group">

                    <label>Complete Address</label>

                    <textarea
                        rows="4"
                        value={addressForm.address}
                        onChange={(e) =>
                            setAddressForm({
                                ...addressForm,
                                address: e.target.value,
                            })
                        }
                    />

                </div>

                <button
                    className="save-address-btn"
                    type="button"
                    onClick={handleSaveAddress}
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
  className={`checkout-apply-btn ${
    appliedCoupon && appliedCoupon === promo ? "applied" : ""
  }`}
  onClick={applyCoupon}
  disabled={!promo || (appliedCoupon && appliedCoupon === promo)}
>
  {appliedCoupon && appliedCoupon === promo
    ? "Applied ✓"
    : "Apply"}
</button>

</div>

  <h4 className="offers-title">
    Or choose from our best offers
  </h4>

 <div className="promo-grid">
  {coupons.map((coupon) => (
    <div
      key={coupon._id}
      className={`promo-offer ${
        appliedCoupon === coupon.code ? "active" : ""
      }`}
      onClick={() => setPromo(coupon.code)}
    >
      <span className="offer-icon">🎉</span>

      <h5>{coupon.code}</h5>

      <p>
        {coupon.discountType === "Percentage"
          ? `${coupon.discountValue}% OFF`
          : `₹${coupon.discountValue} OFF`}
      </p>

      <small>Tap to Apply</small>
    </div>
  ))}
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
                      className="ch-summary-item"
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
