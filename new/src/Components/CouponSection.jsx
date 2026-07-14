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
        <div className="coupon-card">
            <div className="coupon-left">
                <span className="coupon-icon">🎟️</span>
                <div>
                    <h4>BITEGOLDRUSH</h4>
                    <p>Apply for 15% discount</p>
                </div>
            </div>
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
    );
};

export default CouponSection;
