import { useState } from "react";
import {
  FaUserCircle,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaCamera,
  FaSave,
} from "react-icons/fa";
import { toast } from "react-toastify";


function AdminProfile() {

  const [profile, setProfile] = useState({
    name: "Admin",
    email: "admin@biterush.com",
    phone: "+91 9876543210",
    username: "admin",
    role: "Administrator",

    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {

    const { name, value } = e.target;

    setProfile({
      ...profile,
      [name]: value,
    });

  };

  const handleSave = (e) => {

    e.preventDefault();

    if (
      profile.newPassword &&
      profile.newPassword !== profile.confirmPassword
    ) {
      toast.error("Passwords do not match!");
      return;
    }

    toast.success("Profile updated successfully!");

  };

  return (

    <div className="profile-page">

      <div className="profile-header">

        <h2>My Profile</h2>

        <p>Manage your administrator account</p>

      </div>

      <form
        className="profile-card"
        onSubmit={handleSave}
      >

        <div className="profile-avatar">

          <FaUserCircle className="avatar-icon" />

          <button
            type="button"
            className="change-photo-btn"
          >

            <FaCamera />

            Change Photo

          </button>

        </div>

        <div className="profile-grid">

          <div className="input-group">

            <label>

              <FaUser />

              Full Name

            </label>

            <input
              name="name"
              value={profile.name}
              onChange={handleChange}
            />

          </div>

          <div className="input-group">

            <label>

              <FaEnvelope />

              Email

            </label>

            <input
              name="email"
              value={profile.email}
              onChange={handleChange}
            />

          </div>

          <div className="input-group">

            <label>

              <FaPhone />

              Phone

            </label>

            <input
              name="phone"
              value={profile.phone}
              onChange={handleChange}
            />

          </div>

          <div className="input-group">

            <label>

              <FaUser />

              Username

            </label>

            <input
              name="username"
              value={profile.username}
              onChange={handleChange}
            />

          </div>

          <div className="input-group">

            <label>Role</label>

            <input
              value={profile.role}
              disabled
            />

          </div>

        </div>

        <div className="password-section">

          <h3>

            <FaLock />

            Change Password

          </h3>

          <div className="profile-grid">

            <div className="input-group">

              <label>Current Password</label>

              <input
                type="password"
                name="currentPassword"
                value={profile.currentPassword}
                onChange={handleChange}
              />

            </div>

            <div className="input-group">

              <label>New Password</label>

              <input
                type="password"
                name="newPassword"
                value={profile.newPassword}
                onChange={handleChange}
              />

            </div>

            <div className="input-group">

              <label>Confirm Password</label>

              <input
                type="password"
                name="confirmPassword"
                value={profile.confirmPassword}
                onChange={handleChange}
              />

            </div>

          </div>

        </div>

        <button
          type="submit"
          className="save-profile-btn"
        >

          <FaSave />

          Save Changes

        </button>

      </form>

    </div>

  );

}

export default AdminProfile;