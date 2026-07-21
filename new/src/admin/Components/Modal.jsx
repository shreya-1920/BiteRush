import "./../styles/modal.css";
import { FaTimes } from "react-icons/fa";

function Modal({ open, title, children, onClose }) {
    if (!open) return null;

    return (
        <div className="br-modal-overlay">
            <div className="br-modal-box">

                <div className="br-modal-header">

                    <h2>{title}</h2>

                    <button
                        className="br-close-btn"
                        onClick={onClose}
                    >
                        <FaTimes />
                    </button>

                </div>

                <div className="br-modal-body">
                    {children}
                </div>

            </div>
        </div>
    );
}

export default Modal;