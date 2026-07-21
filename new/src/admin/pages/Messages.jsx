import { FaSearch, FaEye, FaReply } from "react-icons/fa";
import { useState } from "react";



import MessageDetailsModal from "../components/modals/MessageDetailsModal";
import ReplyModal from "../components/modals/ReplyModal";
function Messages() {
const [modalType, setModalType] = useState(null);
const [selectedMessage, setSelectedMessage] = useState(null);
  const messages = [
  {
    id: 1,
    customer: "Rahul Sharma",
    email: "rahul@gmail.com",
    subject: "Payment Failed",
    content:
      "I tried placing an order but my payment failed twice. Please help.",
    date: "20 Jul 2026",
    status: "Unread",
  },
  {
    id: 2,
    customer: "Priya Verma",
    email: "priya@gmail.com",
    subject: "Refund Request",
    content:
      "I received the wrong order and would like a refund.",
    date: "19 Jul 2026",
    status: "Read",
  },
  {
    id: 3,
    customer: "Aman Singh",
    email: "aman@gmail.com",
    subject: "Order Delayed",
    content:
      "My order has been delayed for more than an hour.",
    date: "18 Jul 2026",
    status: "Unread",
  },
];
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
              <tr key={msg.id}>

                <td>{msg.customer}</td>

                <td>{msg.email}</td>

                <td>{msg.subject}</td>

                <td>{msg.date}</td>

                <td>

                  <span
                    className={
                      msg.status==="Read"
                      ? "status delivered"
                      : "status pending"
                    }
                  >
                    {msg.status}
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
    className="icon-btn"
    onClick={() => {
        setSelectedMessage(msg);
        setModalType("reply");
    }}
>
    <FaReply />
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

<ReplyModal
    open={modalType === "reply"}
    message={selectedMessage}
    onClose={() => setModalType(null)}
/>
    </div>
  );
}

export default Messages;