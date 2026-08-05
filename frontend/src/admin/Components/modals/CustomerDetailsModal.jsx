import Modal from "../Modal";

function CustomerDetailsModal({ open, customer, onClose }) {

    return (

        <Modal
            open={open}
            title="Customer Details"
            onClose={onClose}
        >

            <div className="details-grid">

                <p><strong>Name:</strong> {customer?.name}</p>

                <p><strong>Email:</strong> {customer?.email}</p>

                <p><strong>Phone:</strong> {customer?.phone}</p>

                <p><strong>Orders:</strong> {customer?.orders}</p>

                <p><strong>Status:</strong> {customer?.status}</p>

            </div>

        </Modal>

    );

}

export default CustomerDetailsModal;