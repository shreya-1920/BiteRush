import Modal from "../Modal";

function OrderDetailsModal({ open, order, onClose }) {
  return (
    <Modal
      open={open}
      title="Order Details"
      onClose={onClose}
    >
      <div className="details-grid">

        <p><strong>Order ID:</strong> #{order?.id}</p>

        <p><strong>Customer:</strong> {order?.customer}</p>

        <p><strong>Restaurant:</strong> {order?.restaurant}</p>

        <p><strong>Amount:</strong> {order?.amount}</p>

        <p><strong>Status:</strong> {order?.status}</p>

      </div>
    </Modal>
  );
}

export default OrderDetailsModal;