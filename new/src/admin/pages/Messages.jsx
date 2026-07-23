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
const [search, setSearch] = useState("");
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
const filteredMessages = messages.filter((msg) => {
  const query = search.toLowerCase();

  return (
    msg.name?.toLowerCase().includes(query) ||
    msg.email?.toLowerCase().includes(query) ||
    msg.subject?.toLowerCase().includes(query) ||
    msg.message?.toLowerCase().includes(query)
  );
});
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
          <input
  type="text"
  placeholder="Search messages..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
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

  {filteredMessages.length > 0 ? (

    filteredMessages.map((msg) => (

      <tr key={msg._id}>

        <td>{msg.name}</td>

        <td>{msg.email}</td>

        <td>{msg.subject}</td>

        <td>
          {new Date(msg.createdAt).toLocaleDateString()}
        </td>

        <td>

          <span className="status delivered">
            Received
          </span>

        </td>

        <td>

          <div className="table-actions">

            <button
              className="icon-btn edit-btn"
              title="View Message"
              onClick={() => {
                setSelectedMessage(msg);
                setModalType("view");
              }}
            >
              <FaEye />
            </button>

            <button
              className="icon-btn delete-btn"
              title="Delete Message"
              onClick={() => handleDelete(msg._id)}
            >
              <FaTrash />
            </button>

          </div>

        </td>

      </tr>

    ))

  ) : (

    <tr>

      <td
        colSpan="6"
        style={{
          textAlign: "center",
          padding: "25px",
          color: "#777",
          fontWeight: "500",
        }}
      >
        No messages found.
      </td>

    </tr>

  )}

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