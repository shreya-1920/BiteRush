import { useState, useEffect } from "react";
import { toast } from "react-toastify";
function CouponForm({ mode, coupon, onClose }) {

    const [formData, setFormData] = useState({
        code: "",
        discount: "",
        minimum: "",
        expiry: "",
        status: "Active",
    });

    useEffect(() => {

        if (mode === "edit" && coupon) {

            setFormData({
                code: coupon.code || "",
                discount: coupon.discount || "",
                minimum: coupon.minimum || "",
                expiry: coupon.expiry || "",
                status: coupon.status || "Active",
            });

        } else {

            setFormData({
                code: "",
                discount: "",
                minimum: "",
                expiry: "",
                status: "Active",
            });

        }

    }, [mode, coupon]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    if (mode === "edit") {
        toast.success("Coupon updated successfully!");
    } else {
        toast.success("Coupon created successfully!");
    }

    onClose();
};

    return (

        <form className="admin-form" onSubmit={handleSubmit}>

            <div className="form-grid">

                <div className="form-group">

                    <label>Coupon Code</label>

                    <input
                        name="code"
                        placeholder="SAVE20"
                        value={formData.code}
                        onChange={handleChange}
                    />

                </div>

                <div className="form-group">

                    <label>Discount</label>

                    <input
                        name="discount"
                        placeholder="20%"
                        value={formData.discount}
                        onChange={handleChange}
                    />

                </div>

                <div className="form-group">

                    <label>Minimum Order</label>

                    <input
                        name="minimum"
                        placeholder="₹500"
                        value={formData.minimum}
                        onChange={handleChange}
                    />

                </div>

                <div className="form-group">

                    <label>Expiry Date</label>

                    <input
                        name="expiry"
                        placeholder="31 Aug 2026"
                        value={formData.expiry}
                        onChange={handleChange}
                    />

                </div>

                <div className="form-group">

                    <label>Status</label>

                    <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="Active">Active</option>
                        <option value="Expired">Expired</option>
                    </select>

                </div>

            </div>

            <div className="form-buttons">

                <button
                    type="button"
                    className="br-cancel-btn"
                    onClick={onClose}
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    className="br-save-btn"
                >
                    {mode === "edit"
                        ? "Update Coupon"
                        : "Save Coupon"}
                </button>

            </div>

        </form>

    );

}

export default CouponForm;