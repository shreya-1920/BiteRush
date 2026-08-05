import { useState } from "react";
import { toast } from "react-toastify";
function StatusForm({ status = "Pending", onClose }) {

    const [currentStatus, setCurrentStatus] = useState(status);
const handleSubmit = (e) => {
    e.preventDefault();

    console.log(currentStatus);

    toast.success("Order status updated!");

    onClose();
};

    return (

        <form
            className="admin-form"
            onSubmit={handleSubmit}
        >

            <div className="form-group">

                <label>Order Status</label>

                <select
                    value={currentStatus}
                    onChange={(e)=>setCurrentStatus(e.target.value)}
                >

                    <option>Pending</option>

                    <option>Preparing</option>

                    <option>Out for Delivery</option>

                    <option>Delivered</option>

                    <option>Cancelled</option>

                </select>

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
                    className="br-save-btn"
                >
                    Update Status
                </button>

            </div>

        </form>

    );

}

export default StatusForm;