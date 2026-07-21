import { useState } from "react";
import Modal from "../Modal";
import { toast } from "react-toastify";
function ReplyModal({ open, onClose }) {

    const [reply, setReply] = useState("");
const handleSubmit = (e) => {
    e.preventDefault();

    console.log(reply);

    toast.success("Reply sent successfully!");

    onClose();
};

    return (

        <Modal
            open={open}
            title="Reply Message"
            onClose={onClose}
        >

            <form
                className="admin-form"
                onSubmit={handleSubmit}
            >

                <div className="form-group">

                    <textarea
                        rows="6"
                        value={reply}
                        onChange={(e)=>setReply(e.target.value)}
                        placeholder="Write your reply..."
                    />

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
                        Send Reply
                    </button>

                </div>

            </form>

        </Modal>

    );

}

export default ReplyModal;