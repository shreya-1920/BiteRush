import { FaPlus, FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";



import Modal from "../components/Modal";
import ConfirmModal from "../components/ConfirmModal";
import CouponForm from "../components/forms/CouponForm";
function Coupons() {
const [modalType, setModalType] = useState(null);
const [selectedCoupon, setSelectedCoupon] = useState(null);
  const coupons = [
    {
      id:1,
      code:"SAVE20",
      discount:"20%",
      minimum:"₹500",
      expiry:"31 Aug 2026",
      status:"Active"
    },
    {
      id:2,
      code:"WELCOME50",
      discount:"50%",
      minimum:"₹800",
      expiry:"15 Sep 2026",
      status:"Active"
    },
    {
      id:3,
      code:"FREEDLV",
      discount:"Free Delivery",
      minimum:"₹299",
      expiry:"10 Aug 2026",
      status:"Expired"
    }
  ];

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

              <tr key={coupon.id}>

                <td>

                  <strong>{coupon.code}</strong>

                </td>

                <td>{coupon.discount}</td>

                <td>{coupon.minimum}</td>

                <td>{coupon.expiry}</td>

                <td>

                  <span
                    className={
                      coupon.status==="Active"
                      ? "status delivered"
                      : "status cancelled"
                    }
                  >

                    {coupon.status}

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
    />
</Modal>

<ConfirmModal
    open={modalType === "delete"}
    title="Delete Coupon"
    message={`Are you sure you want to delete "${selectedCoupon?.code}"?`}
    onClose={() => setModalType(null)}
    onConfirm={() => {
        console.log("Delete Coupon", selectedCoupon);
        setModalType(null);
    }}
/>
    </div>

  );

}

export default Coupons;