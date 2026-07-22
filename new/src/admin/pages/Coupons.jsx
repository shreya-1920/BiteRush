import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { useState,useEffect } from "react";
import { FaPowerOff } from "react-icons/fa";
import { toast } from "react-toastify";
import {
  getAllCoupons,
  deleteCoupon,
  toggleCoupon,
} from "../services/AdminCouponServices";


import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";
import CouponForm from "../components/forms/CouponForm";
function Coupons() {
const [modalType, setModalType] = useState(null);
const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [coupons, setCoupons] = useState([]);
const [loading, setLoading] = useState(true);
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
  return (

    <div className="restaurants-page">

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

        <div className="search-box">

          <FaSearch className="search-icon"/>

          <input
            type="text"
            placeholder="Search coupons..."
          />

        </div>

      </div>

      <div className="table-card">

        <table className="admin-table">

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

            {coupons.map((coupon)=>(

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
                    className={
                      coupon.isActive
                      ? "status delivered"
                      : "status cancelled"
                    }
                  >

                   {coupon.isActive ? "Active" : "Inactive"}

                  </span>

                </td>

                <td>

                  <div className="table-actions">

                <button
    className="icon-btn edit-btn"
    onClick={() => {
        setSelectedCoupon(coupon);
        setModalType("edit");
    }}
>
    <FaEdit />
</button>
<button
  className="icon-btn"
  onClick={async () => {
    try {
      await toggleCoupon(coupon._id);
      toast.success("Coupon status updated!");
      fetchCoupons();
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  }}
>
  <FaPowerOff />
</button>
<button
    className="icon-btn delete-btn"
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

            ))}

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