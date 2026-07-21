import { useState } from "react";
import { toast } from "react-toastify";
function CustomerForm({ onClose }) {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        status: "Active",
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    toast.success("Customer added successfully!");

    onClose();
};

    return (

        <form
            className="admin-form"
            onSubmit={handleSubmit}
        >

            <div className="form-grid">

                <div className="form-group">

                    <label>Name</label>

                    <input
                        name="name"
                        placeholder="Enter customer name"
                        value={formData.name}
                        onChange={handleChange}
                    />

                </div>

                <div className="form-group">

                    <label>Email</label>

                    <input
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                    />

                </div>

                <div className="form-group">

                    <label>Phone</label>

                    <input
                        name="phone"
                        placeholder="Enter no."
                        value={formData.phone}
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
                        <option>Active</option>
                        <option>Blocked</option>
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
                    Save Customer
                </button>

            </div>

        </form>

    );

}

export default CustomerForm;