import { useState } from "react";
import {
  FaStore,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaArrowLeft,
} from "react-icons/fa";

import "../styles/RestaurantLogin.css";

function RestaurantLogin() {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);
  };

  return (
    <div className="brPartnerViewport">

      {/* Decorative Blobs */}

      <div className="brPartnerGlowOne"></div>
      <div className="brPartnerGlowTwo"></div>
      <div className="brPartnerGlowThree"></div>

      {/* Login Card */}

      <div className="brPartnerCard">

        <div className="brPartnerStoreBadge">
          <FaStore />
        </div>

        <h1 className="brPartnerHeading">
          Welcome Back <span>👋</span>
        </h1>

        <p className="brPartnerSubHeading">
          Restaurant Partner Dashboard
        </p>

        <p className="brPartnerDescription">
          Manage orders, menu, earnings and customers from one secure place.
        </p>

        <form
          className="brPartnerForm"
          onSubmit={handleSubmit}
        >

          {/* EMAIL */}

          <div className="brPartnerField">

            <label className="brPartnerLabel">
              EMAIL ADDRESS
            </label>

            <div className="brPartnerInputBox">

              <FaEnvelope className="brPartnerInputIcon" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="restaurant@example.com"
                className="brPartnerInput"
              />

            </div>

          </div>

          {/* PASSWORD */}

          <div className="brPartnerField">

            <label className="brPartnerLabel">
              PASSWORD
            </label>

            <div className="brPartnerInputBox">

              <FaLock className="brPartnerInputIcon" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="brPartnerInput"
              />

              <button
                type="button"
                className="brPartnerEyeButton"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>

          </div>

          {/* REMEMBER */}

          

          {/* LOGIN */}

          <button
            type="submit"
            className="brPartnerLoginBtn"
          >
            Login to Dashboard
          </button>

        </form>

        {/* Footer */}

        <div className="brPartnerFooter">

          <button className="brPartnerBackBtn">

            <FaArrowLeft />

            <span>Back to BiteRush</span>

          </button>

          <p className="brPartnerSupport">

            Need help?

            <span> Contact Administrator</span>

          </p>

        </div>

      </div>

    </div>
  );
}

export default RestaurantLogin;