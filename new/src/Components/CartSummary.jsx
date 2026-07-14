import { useCart } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CartSummary({
    subtotal,
    appliedCoupon,
}) {

    const navigate = useNavigate();
    const { cartItems } = useCart();

    // Existing calculations
    const deliveryFee = subtotal > 499 ? 0 : 40;

    const gst = Math.round(subtotal * 0.05);

    // Coupon discount
    const discount = appliedCoupon
        ? (subtotal * appliedCoupon.discount) / 100
        : 0;

    // Final total
    const total = subtotal + deliveryFee + gst - discount;

    const handleCheckout = () => {

        if (cartItems.length === 0) {
            toast.error("Your cart is empty!");
            return;
        }

        const token = localStorage.getItem("token");

        if (!token) {
            toast.warning("Please login first!");
            navigate("/auth");
            return;
        }

        navigate("/checkout");
    };

    return (
        <div className="cart-summary">

            <h2>Order Summary</h2>

            <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
            </div>

            <div className="summary-row">
                <span>Delivery Fee</span>

                <span className="free-delivery">
                    {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
                </span>
            </div>

            <div className="summary-row">
                <span>GST</span>
                <span>₹{gst}</span>
            </div>

            {appliedCoupon && (
                <div className="summary-row discount">
                    <span>Coupon ({appliedCoupon.code})</span>
                    <span>-₹{discount.toFixed(2)}</span>
                </div>
            )}

            <hr />

            <div className="summary-total">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
            </div>

            <button
                className="checkout-btn"
                onClick={handleCheckout}
            >
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
    );
}