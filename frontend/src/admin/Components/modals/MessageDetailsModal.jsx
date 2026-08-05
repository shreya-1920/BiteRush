import Modal from "../Modal";

function MessageDetailsModal({ open, message, onClose }) {
  if (!message) return null;

  return (
    <Modal
      open={open}
      title="Message Details"
      onClose={onClose}
    >
      <div className="message-details">

        <div className="detail-item">
          <strong>Name</strong>
          <p>{message.name}</p>
        </div>

        <div className="detail-item">
          <strong>Email</strong>
          <p>{message.email}</p>
        </div>

        <div className="detail-item">
          <strong>Phone</strong>
          <p>{message.phone}</p>
        </div>

        <div className="detail-item">
          <strong>Subject</strong>
          <p>{message.subject}</p>
        </div>

        <div className="detail-item">
          <strong>Message</strong>
          <p>{message.message}</p>
        </div>

        <div className="detail-item">
          <strong>Received On</strong>
          <p>{new Date(message.createdAt).toLocaleString()}</p>
        </div>

      </div>
    </Modal>
  );
}

export default MessageDetailsModal;