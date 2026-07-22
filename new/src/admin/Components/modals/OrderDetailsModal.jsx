import Modal from "../Modal";

function OrderDetailsModal({ open, order, onClose }) {
  if (!open || !order) return null;

  return (
    <Modal open={open} title="Order Details" onClose={onClose}>
      <p><strong>Order ID:</strong> {order._id}</p>

      <p><strong>Customer:</strong> {order.user?.name}</p>

      <p><strong>Email:</strong> {order.user?.email}</p>

      <p><strong>Restaurant:</strong> {order.restaurant?.name}</p>

      <p><strong>Total:</strong> ₹{order.total}</p>

      <p><strong>Status:</strong> {order.status}</p>

      <p><strong>Payment:</strong> {order.paymentMethod}</p>

      <p><strong>Placed On:</strong> {new Date(order.createdAt).toLocaleString()}</p>

      {order.deliveryAddress && (
        <>
          <hr />

          <h4>Delivery Address</h4>

          <p>{order.deliveryAddress.fullName}</p>
          <p>{order.deliveryAddress.phone}</p>
          <p>{order.deliveryAddress.address}</p>
          <p>
            {order.deliveryAddress.city}, {order.deliveryAddress.state}
          </p>
          <p>{order.deliveryAddress.pincode}</p>
        </>
      )}
    </Modal>
  );
}

export default OrderDetailsModal;