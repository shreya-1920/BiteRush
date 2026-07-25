import { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaStore,
} from "react-icons/fa";



function RestaurantLogin() {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // TODO
    // navigate("/restaurant/dashboard");
  };

  return (
    <div className="rl-page">

      {/* Background Blobs */}

      <div className="rl-blob rl-blob-one"></div>
      <div className="rl-blob rl-blob-two"></div>

      {/* Logo */}

      <div className="rl-brand">

        <div className="rl-brand-icon">
          <FaStore />
        </div>

        <h1>BiteRush</h1>

        <span>Restaurant Partner Portal</span>

      </div>

      {/* Login Card */}

      <div className="rl-card">

        <h2>Welcome Back 👋</h2>

        <p>
          Sign in to manage your restaurant,
          orders and sales.
        </p>

        <form onSubmit={handleSubmit}>

          <label>Email Address</label>

          <div className="rl-input">

            <FaEnvelope />

            <input
              type="email"
              placeholder="restaurant@example.com"
            />

          </div>

          <label>Password</label>

          <div className="rl-input">

            <FaLock />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
            />

            <button
              type="button"
              className="rl-eye-btn"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>

          </div>

          <div className="rl-options">

            <label className="rl-checkbox">

              <input type="checkbox" />

              Remember Me

            </label>

          </div>

          <button
            className="rl-login-btn"
            type="submit"
          >
            Login to Dashboard
          </button>

        </form>

        <div className="rl-divider"></div>

        <small>
          Need help?
          <span> Contact Administrator</span>
        </small>

      </div>

    </div>
  );
}

export default RestaurantLogin;