import { FaSearch, FaEye, FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import {
  getAllMessages,
  deleteMessage,
} from "../services/AdminMessageServices";

import MessageDetailsModal from "../components/modals/MessageDetailsModal";
function Messages() {
const [modalType, setModalType] = useState(null);
const [selectedMessage, setSelectedMessage] = useState(null);
  const [messages, setMessages] = useState([]);
const [loading, setLoading] = useState(true);

const fetchMessages = async () => {
  try {
    const data = await getAllMessages();
    setMessages(data);
  } catch (error) {
    toast.error("Failed to fetch messages");
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  fetchMessages();
}, []);
const handleDelete = async (id) => {
  if (!window.confirm("Delete this message?")) return;

  try {
    await deleteMessage(id);
    toast.success("Message deleted");
    fetchMessages();
  } catch (error) {
    toast.error("Delete failed");
  }
};
if (loading) {
  return <h3>Loading Messages...</h3>;
}
  return (
    <div className="restaurants-page">

      <div className="page-header">
        <div>
          <h2>Messages</h2>
          <p>Customer support inbox</p>
        </div>
      </div>

      <div className="table-toolbar">

        <div className="search-box">
          <FaSearch className="search-icon"/>
          <input placeholder="Search messages..." />
        </div>

      </div>

      <div className="table-card">

        <table className="admin-table">

          <thead>

            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th>Subject</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {messages.map((msg)=>(
              <tr key={msg._id}>

                <td>{msg.name}</td>

                <td>{msg.email}</td>

                <td>{msg.subject}</td>

                <td>
  {new Date(msg.createdAt).toLocaleDateString()}
</td>

                <td>

                  <span
                    className={
                      msg.status==="Read"
                      ? "status delivered"
                      : "status pending"
                    }
                  >
                   <td>
    <span className="status delivered">
        Received
    </span>
</td>
                  </span>

                </td>

                <td>

                 <div className="table-actions">

<button
    className="icon-btn edit-btn"
    onClick={() => {
        setSelectedMessage(msg);
        setModalType("view");
    }}
>
    <FaEye />
</button>

<button
    className="icon-btn delete-btn"
    onClick={() => handleDelete(msg._id)}
>
    <FaTrash />
</button>

</div>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>
<MessageDetailsModal
    open={modalType === "view"}
    message={selectedMessage}
    onClose={() => setModalType(null)}
/>

</div>
  );
}

export default Messages;