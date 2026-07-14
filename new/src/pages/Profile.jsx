import "../styles/Profile.css";
import { FaUserCircle, FaEnvelope, FaUser, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../services/AuthServices";
import { toast } from "react-toastify";

const Profile = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

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
    <div className="profile-page">

      <div className="profile-card">

        <div className="profile-avatar">
          <FaUserCircle />
        </div>

        <h2>{user?.name}</h2>

        <p className="profile-subtitle">
          Welcome back to BiteRush 👋
        </p>

        <div className="profile-info">

          <div className="info-row">
            <FaUser />
            <span>{user?.name}</span>
          </div>

          <div className="info-row">
            <FaEnvelope />
            <span>{user?.email}</span>
          </div>

        </div>

        <div className="profile-actions">

          <button
            onClick={() => navigate("/orders")}
            className="profile-btn"
          >
            Recent Orders
          </button>

          <button
            onClick={() => navigate("/wishlist")}
            className="profile-btn"
          >
            Wishlist
          </button>

          <button
            onClick={handleLogout}
            className="logout-btn"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

      </div>

    </div>
  );
};

export default Profile;