import Modal from "../Modal";

function MessageDetailsModal({ open, message, onClose }) {

    return (

        <Modal
            open={open}
            title="Message"
            onClose={onClose}
        >

            <h3>{message?.subject}</h3>

            <p>{message?.content}</p>

        </Modal>

    );

}

export default MessageDetailsModal;