export default function CartSummary() {
  return (
    <div>
     {/* RIGHT */}

<div className="cart-summary">

    <h2>Order Summary</h2>

    <div className="summary-row">

        <span>Subtotal</span>

        <span>₹897</span>

    </div>

    <div className="summary-row">

        <span>Delivery Fee</span>

        <span className="free-delivery">
    FREE
</span>

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

    <div className="summary-total">

        <span>Total</span>

        <span>₹831</span>

    </div>

    <button className="checkout-btn">
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