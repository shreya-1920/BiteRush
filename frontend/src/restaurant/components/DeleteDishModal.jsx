import { FaTrashAlt, FaTimes } from "react-icons/fa";
import "../styles/Restaurant-panel.css";

function DeleteDishModal({ open, dish, onClose, onDelete }) {

    if (!open) return null;

    return (
        <div className="ddm-overlay">

            <div className="ddm-modal">

                <button
                    className="ddm-close"
                    onClick={onClose}
                >
                    <FaTimes />
                </button>

                <div className="ddm-icon">
                    <FaTrashAlt />
                </div>

                <h2>Delete Dish?</h2>

                <p>
                    Are you sure you want to delete
                    <strong> "{dish?.name}" </strong>?
                </p>

                <span>
                    This action cannot be undone.
                </span>

                <div className="ddm-buttons">

                    <button
                        className="ddm-cancel"
                        onClick={onClose}
                    >
                        Cancel
                    </button>

                    <button
                        className="ddm-delete"
                        onClick={() => {
                            onDelete();
                            onClose();
                        }}
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>
    );
}

export default DeleteDishModal;