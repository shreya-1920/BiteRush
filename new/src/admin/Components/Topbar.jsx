import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import {
  getNotifications,
  markAllRead,
} from "../services/NotificationServices";

import { useSearch } from "../context/SearchContext";

import {
  FaChevronDown,
  FaCog,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";

function Topbar() {
  const navigate = useNavigate();

  const { search, setSearch } = useSearch();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const [notifications, setNotifications] = useState([]);

  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(e.target)
      ) {
        setShowNotifications(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
  }, []);

  const loadNotifications = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  return (
    <header className="admin-topbar">

      <div className="search-box">

        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      <div className="topbar-right">

        <div
          className="notification-wrapper"
          ref={notificationRef}
        >

          <button
            className="icon-btn"
            onClick={() => {
              loadNotifications();
              setShowNotifications(!showNotifications);
            }}
          >
            <FaBell />

            <span className="notification-count">
              {notifications.filter((n) => !n.read).length}
            </span>

          </button>

          {showNotifications && (

            <div className="notification-dropdown">

              <div className="notification-header">

                <h4>Notifications</h4>

                <button
                  onClick={async () => {
                    await markAllRead();
                    loadNotifications();
                  }}
                >
                  Mark all read
                </button>

              </div>

              {notifications.map((item) => (

                <div
                  className="notification-card"
                  key={item._id}
                >

                  <div className="notification-icon">
                    <FaBell />
                  </div>

                  <div className="notification-content">

                    <h5>{item.title}</h5>

                    <p>{item.message}</p>

                    <span>
                      {new Date(item.createdAt).toLocaleString()}
                    </span>

                  </div>

                </div>

              ))}

              <div className="notification-footer">

                <button>
                  View All Notifications
                </button>

              </div>

            </div>

          )}

        </div>

        <div
          className="profile-wrapper"
          ref={profileRef}
        >

          <button
            className="profile-btn"
            onClick={() =>
              setShowProfile(!showProfile)
            }
          >

            <FaUserCircle className="profile-icon" />

            <div>

              <h4>Admin</h4>

              <span>Administrator</span>

            </div>

            <FaChevronDown />

          </button>

          {showProfile && (

            <div className="profile-dropdown">

              <button
                onClick={() =>
                  navigate("/admin/profile")
                }
              >
                <FaUser />
                My Profile
              </button>

              <button
                onClick={() =>
                  navigate("/admin/settings")
                }
              >
                <FaCog />
                Settings
              </button>

              <button
                onClick={() => {

                  localStorage.removeItem("adminToken");

                  toast.info("Logged out successfully!");

                  navigate("/admin/login");

                }}
              >
                <FaSignOutAlt />
                Logout
              </button>

            </div>

          )}

        </div>

      </div>

    </header>
  );
}

export default Topbar;