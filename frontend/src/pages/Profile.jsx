import "../styles/Profile.css";
import {
  FaUserCircle,
  FaEnvelope,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaHeart,
  FaShoppingBag,
  FaStar,
  FaSignOutAlt,
  FaEdit,
  FaLock,
} from "react-icons/fa";
import { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/AuthServices";
import { toast } from "react-toastify";

const Profile = () => {
const navigate = useNavigate();

// Get user FIRST
const user = JSON.parse(localStorage.getItem("user"));

// Then create all states
const [showEditModal, setShowEditModal] = useState(false);

const [name, setName] = useState(user?.name || "");
const [email] = useState(user?.email || "");
const [phone, setPhone] = useState(user?.phone || "");
  const handleLogout = async () => {
    try {
      await logoutUser();

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      toast.success("Logged out successfully!");

      navigate("/");
      window.location.reload();
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed.");
    }
  };

  return (
    <section className="user-profile-page">

      <div className="user-profile-container">

        {/* ================= Header ================= */}

        <div className="user-profile-header">

          <div className="user-profile-avatar-wrapper">

            <div className="user-profile-avatar">
              <FaUserCircle />
            </div>

          </div>

          <div className="user-profile-header-content">

            <h1 className="user-profile-name">
              {user?.name}
            </h1>

            <span className="user-profile-member-badge">
              🍕 Food Lover
            </span>

            <p className="user-profile-welcome-text">
              Welcome back to BiteRush 👋
            </p>

          </div>
<button
  className="user-profile-edit-button"
  onClick={() => setShowEditModal(true)}
>
  <FaEdit />
  Edit Profile
</button>
        </div>
        <Modal
    show={showEditModal}
    onHide={() => setShowEditModal(false)}
    centered
    size="lg"
>

    <Modal.Header closeButton>

        <Modal.Title>
            Edit Profile
        </Modal.Title>

    </Modal.Header>

    <Modal.Body>

        <Form>

            <Form.Group className="mb-3">

                <Form.Label>Full Name</Form.Label>

                <Form.Control
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

            </Form.Group>

            <Form.Group className="mb-3">

                <Form.Label>Email Address</Form.Label>

                <Form.Control
                    type="email"
                    value={email}
                    disabled
                />

            </Form.Group>

            <Form.Group className="mb-3">

                <Form.Label>Phone Number</Form.Label>

                <Form.Control
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

            </Form.Group>

        </Form>

    </Modal.Body>

    <Modal.Footer>

        <Button
            variant="secondary"
            onClick={() => setShowEditModal(false)}
        >
            Cancel
        </Button>

        <Button
            variant="danger"
            onClick={() => {
                console.log({
                    name,
                    phone
                });

                setShowEditModal(false);
            }}
        >
            Save Changes
        </Button>

    </Modal.Footer>

</Modal>

 

        {/* ================= Information ================= */}

        <section className="user-profile-information-section">

          <h3 className="user-profile-section-heading">
            Profile Information
          </h3>

          <div className="user-profile-information-grid">

            <div className="user-profile-information-card">

              <FaUser className="user-profile-information-icon" />

              <div>

                <span className="user-profile-information-label">
                  Username
                </span>

                <h5 className="user-profile-information-value">
                  {user?.name}
                </h5>

              </div>

            </div>

            <div className="user-profile-information-card">

              <FaEnvelope className="user-profile-information-icon" />

              <div>

                <span className="user-profile-information-label">
                  Email Address
                </span>

                <h5 className="user-profile-information-value">
                  {user?.email}
                </h5>

              </div>

            </div>

            <div className="user-profile-information-card">

              <FaPhone className="user-profile-information-icon" />

              <div>

                <span className="user-profile-information-label">
                  Phone Number
                </span>

                <h5 className="user-profile-information-value">
                  +91 XXXXX XXXXX
                </h5>

              </div>

            </div>

          </div>

        </section>

        {/* ================= Statistics ================= */}

        <section className="user-profile-statistics-section">

          <h3 className="user-profile-section-heading">
            Your Activity
          </h3>

          <div className="user-profile-statistics-grid">

            <div className="user-profile-statistics-card">

              <FaShoppingBag className="user-profile-statistics-icon" />

              <h2 className="user-profile-statistics-number">
                24
              </h2>

              <p className="user-profile-statistics-title">
                Orders
              </p>

            </div>

            <div className="user-profile-statistics-card">

              <FaHeart className="user-profile-statistics-icon" />

              <h2 className="user-profile-statistics-number">
                13
              </h2>

              <p className="user-profile-statistics-title">
                Wishlist
              </p>

            </div>

            <div className="user-profile-statistics-card">

              <FaMapMarkerAlt className="user-profile-statistics-icon" />

              <h2 className="user-profile-statistics-number">
                3
              </h2>

              <p className="user-profile-statistics-title">
                Addresses
              </p>

            </div>

            <div className="user-profile-statistics-card">

              <FaStar className="user-profile-statistics-icon" />

              <h2 className="user-profile-statistics-number">
                8
              </h2>

              <p className="user-profile-statistics-title">
                Reviews
              </p>

            </div>

          </div>

        </section>

        {/* ================= Quick Actions ================= */}

        <section className="user-profile-action-section">

          <h3 className="user-profile-section-heading">
            Quick Actions
          </h3>

          <div className="user-profile-action-grid">

            <button
              className="user-profile-action-card"
              onClick={() => navigate("/orders")}
            >
              <FaShoppingBag />
              <span>Recent Orders</span>
            </button>

            <button
              className="user-profile-action-card"
              onClick={() => navigate("/wishlist")}
            >
              <FaHeart />
              <span>Wishlist</span>
            </button>

            <button className="user-profile-action-card">
              <FaMapMarkerAlt />
              <span>Manage Address</span>
            </button>

            <button className="user-profile-action-card">
              <FaLock />
              <span>Change Password</span>
            </button>

          </div>

        </section>

        {/* ================= Logout ================= */}

        <div className="user-profile-logout-wrapper">

          <button
            className="user-profile-logout-button"
            onClick={handleLogout}
          >
            <FaSignOutAlt />

            Logout
          </button>

        </div>

      </div>

    </section>
  );
};

export default Profile;