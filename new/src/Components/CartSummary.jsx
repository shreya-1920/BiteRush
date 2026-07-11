import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
export default function CartSummary() {
    const { cartItems } = useCart();
const navigate = useNavigate();

const subtotal = cartItems.reduce(
    (total, item) => total + item.price,
    0
);

const gst = Math.round(subtotal * 0.05);
const discount = 0;
const total = subtotal + gst - discount;
  return (
    <div>
     {/* RIGHT */}

<div className="cart-summary">

    <h2>Order Summary</h2>

    <div className="summary-row">

        <span>Subtotal</span>

        <span>₹{subtotal}</span>

    </div>

    <div className="summary-row">

        <span>Delivery Fee</span>

        <span className="free-delivery">
    FREE
</span>

    </div>

    <div className="summary-row">

        <span>GST</span>

        <span>₹{gst}</span>

    </div>

    <div className="summary-row discount">

        <span>Discount</span>

        <span>-₹{discount}</span>

    </div>

    <hr />

    <div className="summary-total">

        <span>Total</span>

        <span>₹{total}</span>

    </div>

    <button className="checkout-btn"  onClick={() => navigate("/checkout")}>
        Proceed to Checkout
    </button>

    <p className="secure-payment">
        🔒 Secure payments powered by BiteRush
    </p>

    <div className="summary-info">

        <div className="info-box">

            <span>📍</span>

            <h4>Deliver To</h4>

            <p>Home</p>

        </div>

        <div className="info-box">

            <span>⏱️</span>

            <h4>ETA</h4>

            <p>25-30 mins</p>

        </div>

    </div>

</div>
    </div>
  );
}