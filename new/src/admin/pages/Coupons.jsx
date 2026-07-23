import { FaEye,FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
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
const [search, setSearch] = useState("");
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
  const query = search.toLowerCase();

  return (
    coupon.code?.toLowerCase().includes(query) ||
    coupon.description?.toLowerCase().includes(query) ||
    coupon.discount?.toString().includes(query) ||
    coupon.status?.toLowerCase().includes(query)
  );
});
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
  value={search}
  onChange={(e) => setSearch(e.target.value)}
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

            {/* View */}

            <button
              className="icon-btn view-btn"
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
              className="icon-btn edit-btn"
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
              className={`icon-btn ${
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
              className="icon-btn delete-btn"
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