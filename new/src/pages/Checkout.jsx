import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useState } from "react";
import Container from "react-bootstrap/Container";
import "../styles/Checkout.css";
import { placeOrder } from "../services/CheckoutServices";
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
  FaWallet
} from "react-icons/fa";

import { MdDeliveryDining } from "react-icons/md";
import { SiGooglepay } from "react-icons/si";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";


function Checkout() {
    const [name, setName] = useState("");
const [phone, setPhone] = useState("");

    const navigate = useNavigate();

const [email, setEmail] = useState("");
const [instructions, setInstructions] = useState("");

const handlePlaceOrder = async () => {

    if (!name.trim()) {
        toast.error("Please enter your name.");
        return;
    }

    if (!phone.trim()) {
        toast.error("Please enter your phone number.");
        return;
    }

   

    try {

        await placeOrder({

            name,
            phone,
            
            paymentMethod: "Cash"

        });

        toast.success("Order placed successfully!");

        navigate("/");

    } catch (error) {

        toast.error(
            error.response?.data?.message || "Checkout failed."
        );

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

        <p className="checkout-subtitle">
            Complete your order securely.
        </p>

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

    <button className="checkout-edit-btn">
        <FaEdit />
        <span>Edit</span>
    </button>

    <button className="checkout-add-btn">
        <FaPlus />
        <span>Add New</span>
    </button>

</div>
</div>

  <div className="address-box">
    <h4>Jane Doe</h4>
    <p>+1 234 567 890</p>
    <p>123 Gourmet Lane, Foodie District, Jaipur, Rajasthan - 302001</p>
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

    <div className="delivery-options">

        <div className="delivery-option active">

            <div className="delivery-radio"></div>

            <div>

                <h4>Deliver ASAP</h4>

                <p>Arrives in 25–30 min</p>

            </div>

        </div>

        <div className="delivery-option">

            <div className="delivery-radio"></div>

            <div>

                <h4>Schedule Delivery</h4>

                <p>Pick a later date & time</p>

            </div>

        </div>

    </div>

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

<FaLock/>

256-bit SSL Secure

</span>
    </div>

   <div className="payment-options">

    <div className="payment-option active">
        <FaCreditCard className="payment-icon" />
        <span>Card</span>
    </div>

    <div className="payment-option">
        <FaWallet className="payment-icon" />
        <span>Wallet</span>
    </div>

    <div className="payment-option">
        <SiGooglepay className="payment-icon" />
        <span>UPI</span>
    </div>

    <div className="payment-option">
        <FaMoneyBillWave className="payment-icon" />
        <span>Cash</span>
    </div>

</div>

    <div className="card-details">

        <div className="form-group full-width">

            <label>Card Number</label>

            <input
                type="text"
                placeholder="XXXX XXXX XXXX XXXX"
            />

        </div>

        <div className="form-group">

            <label>Expiry Date</label>

            <input
                type="text"
                placeholder="MM/YY"
            />

        </div>

        <div className="form-group">

            <label>CVV</label>

            <input
                type="password"
                placeholder="***"
            />

        </div>

    </div>

</div>

            {/* Promo */}

           <div className="checkout-card">

    <div className="checkout-title">
<div className="checkout-icon">
    <FaTag />
</div>

        <h3>Promo Code</h3>

    </div>

    <div className="promo-box">

        <input
            type="text"
            placeholder="Enter promo code"
        />

        <button>
            Apply
        </button>

    </div>

    <div className="promo-chips">

        <span>WELCOME50</span>

        <span>FREEDEL</span>

        <span>SAVE20</span>

    </div>

</div>

        </div>

        {/* RIGHT SIDE */}

        <aside className="checkout-right">

            <div className="order-summary">

    <h2>Order Summary</h2>

    <div className="summary-items">

        <div className="summary-item">

            <div>

                <h4>Classic Burger</h4>

                <span>Qty: 2</span>

            </div>

            <strong>₹398</strong>

        </div>

        <div className="summary-item">

            <div>

                <h4>French Fries</h4>

                <span>Qty: 1</span>

            </div>

            <strong>₹149</strong>

        </div>

    </div>

    <hr />

    <div className="price-row">

        <span>Subtotal</span>

        <span>₹547</span>

    </div>

    <div className="price-row">

        <span>Delivery Fee</span>

        <span>₹40</span>

    </div>

    <div className="price-row">

        <span>Discount</span>

        <span className="discount">-₹50</span>

    </div>

    <div className="price-row total">

        <span>Total</span>

        <span>₹537</span>

    </div>

 <div className="eta-card">

    <MdDeliveryDining className="eta-icon"/>

    <div>

        <h4>Estimated Delivery</h4>

        <p>25 - 30 Minutes</p>

    </div>

</div>

   <button
    className="place-order-btn"
    onClick={handlePlaceOrder}
>
    Place Order
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
