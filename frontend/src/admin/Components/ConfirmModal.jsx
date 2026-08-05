import Modal from "./Modal";
import { FaTrashAlt } from "react-icons/fa";

function ConfirmModal({
  open,
  title = "Delete Item",
  message,
  onClose,
  onConfirm,
}) {
  return (
    <Modal open={open} title={title} onClose={onClose}>
      <div className="confirm-modal">

        <div className="confirm-icon">
          <FaTrashAlt />
        </div>

        <p>{message}</p>

        <div className="confirm-actions">

          <button
            className="br-cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="br-delete-btn"
            onClick={onConfirm}
          >
            Delete
          </button>

        </div>

      </div>
    </Modal>
  );
}

export default ConfirmModal;