import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  createCoupon,
  updateCoupon,
} from "../../services/AdminCouponServices";
function CouponForm({
  mode,
  coupon,
  onClose,
  onSuccess,
}) {

 const [formData, setFormData] = useState({
  title: "",
  code: "",
  discountType: "Percentage",
  discountValue: "",
  minimumAmount: "",
  maximumDiscount: "",
  expiryDate: "",
  usageLimit: "",
});

useEffect(() => {
  if (mode === "edit" && coupon) {
    setFormData({
      title: coupon.title || "",
      code: coupon.code || "",
      discountType: coupon.discountType || "Percentage",
      discountValue: coupon.discountValue || "",
      minimumAmount: coupon.minimumAmount || "",
      maximumDiscount: coupon.maximumDiscount || "",
      expiryDate: coupon.expiryDate
        ? coupon.expiryDate.slice(0, 10)
        : "",
      usageLimit: coupon.usageLimit || "",
    });
  } else {
    setFormData({
      title: "",
      code: "",
      discountType: "Percentage",
      discountValue: "",
      minimumAmount: "",
      maximumDiscount: "",
      expiryDate: "",
      usageLimit: "",
    });
  }
}, [mode, coupon]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (mode === "edit") {
      await updateCoupon(coupon._id, formData);
      toast.success("Coupon updated successfully!");
    } else {
      await createCoupon(formData);
      toast.success("Coupon created successfully!");
    }

    // Refresh Coupons Table
    if (onSuccess) {
      await onSuccess();
    }

    // Reset form
    setFormData({
      title: "",
      code: "",
      discountType: "Percentage",
      discountValue: "",
      minimumAmount: "",
      maximumDiscount: "",
      expiryDate: "",
      usageLimit: "",
    });

    // Close Modal
    onClose();

  } catch (err) {
    toast.error(
      err.response?.data?.message || "Something went wrong"
    );
  }
};

    return (

      <form className="admin-form" onSubmit={handleSubmit}>

  <div className="form-grid">

    <div className="form-group">
      <label>Coupon Title</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Welcome Offer"
        required
      />
    </div>

    <div className="form-group">
      <label>Coupon Code</label>
      <input
        type="text"
        name="code"
        value={formData.code}
        onChange={handleChange}
        placeholder="WELCOME50"
        required
      />
    </div>

    <div className="form-group">
      <label>Discount Type</label>

      <select
        name="discountType"
        value={formData.discountType}
        onChange={handleChange}
      >
        <option value="Percentage">Percentage</option>
        <option value="Flat">Flat</option>
      </select>
    </div>

    <div className="form-group">
      <label>Discount Value</label>

      <input
        type="number"
        name="discountValue"
        value={formData.discountValue}
        onChange={handleChange}
        placeholder="50"
        required
      />
    </div>

    <div className="form-group">
      <label>Minimum Order Amount</label>

      <input
        type="number"
        name="minimumAmount"
        value={formData.minimumAmount}
        onChange={handleChange}
        placeholder="500"
      />
    </div>

    <div className="form-group">
      <label>Maximum Discount</label>

      <input
        type="number"
        name="maximumDiscount"
        value={formData.maximumDiscount}
        onChange={handleChange}
        placeholder="300"
      />
    </div>

    <div className="form-group">
      <label>Usage Limit</label>

      <input
        type="number"
        name="usageLimit"
        value={formData.usageLimit}
        onChange={handleChange}
        placeholder="100"
      />
    </div>

    <div className="form-group">
      <label>Expiry Date</label>

      <input
        type="date"
        name="expiryDate"
        value={formData.expiryDate}
        onChange={handleChange}
        required
      />
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