import { FaEye,FaPlus,  FaEdit, FaTrash } from "react-icons/fa";
import { useState,useEffect } from "react";
import { FaPowerOff } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  getAllCoupons,
  deleteCoupon,
  toggleCoupon,
} from "../Services/AdminCouponServices";

import { useSearch } from "../context/SearchContext";
import Modal from "../Components/Modal";
import ConfirmModal from "../Components/ConfirmModal";
import CouponForm from "../Components/forms/CouponForm";
function Coupons() {
const [modalType, setModalType] = useState(null);
const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [coupons, setCoupons] = useState([]);
const [loading, setLoading] = useState(true);
const { search } = useSearch();
const fetchCoupons = async () => {
  try {
    const data = await getAllCoupons();
    setCoupons(data);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchCoupons();
}, []);
if (loading) {
  return <h2>Loading...</h2>;
}
const filteredCoupons = coupons.filter((coupon) => {
  const text = search.toLowerCase();

  return (
    coupon.code?.toLowerCase().includes(text) ||
    coupon.discountType?.toLowerCase().includes(text) ||
    coupon.discountValue?.toString().includes(text)
  );
});
  return (

    <div className="coupons-page">

      <div className="page-header">

        <div>

          <h2>Coupons</h2>

          <p>Manage discount coupons</p>

        </div>

   <button
    className="admin-btn"
    onClick={() => {
        setSelectedCoupon(null);
        setModalType("add");
    }}
>
    <FaPlus />
    <span>Add Coupon</span>
</button>

      </div>

      <div className="table-toolbar">

        

      </div>

      <div className="admin-coupons-table-card">

        <table className="admin-coupons-table">

          <thead>

            <tr>

              <th>Coupon Code</th>
              <th>Discount</th>
              <th>Minimum Order</th>
              <th>Expiry</th>
              <th>Status</th>
              <th>Actions</th>

            </tr>

          </thead>

    <tbody>

  {filteredCoupons.length > 0 ? (

    filteredCoupons.map((coupon) => (

      <tr key={coupon._id}>

        <td>
          <strong>{coupon.code}</strong>
        </td>

        <td>
          {coupon.discountType === "Percentage"
            ? `${coupon.discountValue}%`
            : `₹${coupon.discountValue}`}
        </td>

        <td>₹{coupon.minimumAmount}</td>

        <td>
          {new Date(coupon.expiryDate).toLocaleDateString()}
        </td>

        <td>

<span
className={`admin-coupon-status ${
coupon.isActive ? "active" : "inactive"
}`}
>
            {coupon.isActive ? "Active" : "Inactive"}
          </span>

        </td>

        <td>

          <div className="admin-coupon-actions">

            {/* View */}

            <button
              className="admin-coupon-btn view-btn"
              title="View Coupon"
              onClick={() => {
                setSelectedCoupon(coupon);
                setModalType("view");
              }}
            >
              <FaEye />
            </button>

            {/* Edit */}

            <button
              className="admin-coupon-btn edit-btn"
              title="Edit Coupon"
              onClick={() => {
                setSelectedCoupon(coupon);
                setModalType("edit");
              }}
            >
              <FaEdit />
            </button>

            {/* Activate / Deactivate */}

            <button
              className={`admin-coupon-btn ${
                coupon.isActive
                  ? "warning-btn"
                  : "success-btn"
              }`}
              title={
                coupon.isActive
                  ? "Deactivate Coupon"
                  : "Activate Coupon"
              }
              onClick={async () => {
                try {
                  await toggleCoupon(coupon._id);

                  toast.success("Coupon status updated!");

                  fetchCoupons();

                } catch (err) {
                  toast.error(
                    err.response?.data?.message ||
                    "Something went wrong"
                  );
                }
              }}
            >
              <FaPowerOff />
            </button>

            {/* Delete */}

            <button
              className="admin-coupon-btn delete-btn"
              title="Delete Coupon"
              onClick={() => {
                setSelectedCoupon(coupon);
                setModalType("delete");
              }}
            >
              <FaTrash />
            </button>

          </div>

        </td>

      </tr>

    ))

  ) : (

    <tr>

      <td
        colSpan="6"
        style={{
          textAlign: "center",
          padding: "25px",
          fontWeight: "500",
          color: "#777",
        }}
      >
        No coupons found.
      </td>

    </tr>

  )}

</tbody>

        </table>

      </div>
<Modal
    open={modalType === "add" || modalType === "edit"}
    title={
        modalType === "add"
            ? "Add Coupon"
            : "Edit Coupon"
    }
    onClose={() => setModalType(null)}
>
   <CouponForm
    mode={modalType}
    coupon={selectedCoupon}
    onClose={() => setModalType(null)}
    onSuccess={fetchCoupons}
/>
</Modal>

<ConfirmModal
    open={modalType === "delete"}
    title="Delete Coupon"
    message={`Are you sure you want to delete "${selectedCoupon?.code}"?`}
    onClose={() => setModalType(null)}
   onConfirm={async () => {
  try {
    await deleteCoupon(selectedCoupon._id);

    toast.success("Coupon deleted successfully!");

    fetchCoupons();

    setModalType(null);

  } catch (err) {
    toast.error(
      err.response?.data?.message ||
      "Something went wrong"
    );
  }
}}
/>
    </div>

  );

}

export default Coupons;