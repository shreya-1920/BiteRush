const CouponSection = ({
    subtotal,
    onApplyCoupon,
    appliedCoupon
}) => {
 const handleApply = () => {

    if (appliedCoupon) {
        return;
    }

    if (subtotal < 500) {
        alert("Minimum order ₹500 required.");
        return;
    }

    onApplyCoupon({
        code: "BITEGOLDRUSH",
        discount: 15,
        type: "percentage",
    });
};

    return (
        <div className="br-coupon-card">
            <div className="br-coupon-left">
                <span className="br-coupon-icon">🎟️</span>
                <div>
                    <h4>BITEGOLDRUSH</h4>
                    <p>Apply for 15% discount</p>
                </div>
            </div>
            <div className="coupon-right">

            <button
    className="apply-btn"
    onClick={handleApply}
    disabled={appliedCoupon}
>
    {appliedCoupon ? "Applied ✓" : "Apply"}
</button>
 {appliedCoupon && (
            <p className="coupon-success">
                🎉 15% discount applied successfully!
            </p>
        )}
        </div>
        </div>
    );
};

export default CouponSection;
