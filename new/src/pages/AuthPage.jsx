import { useState,  } from "react";
import { toast } from "react-toastify";

import logo from "../assets/images/logo.png";
import foodImage from "../assets/images/auth-food.png";

import { useNavigate, useLocation } from "react-router-dom";
import {
  loginUser,
  registerUser,
  forgotPassword,
} from "../services/AuthServices";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUsers,
  FaStar,
  FaMotorcycle,
} from "react-icons/fa";

function AuthPage() {
 
  const navigate = useNavigate();
  const location = useLocation();
const [loading, setLoading] = useState(false);

const [isLogin, setIsLogin] = useState(
  location.state?.mode === "login"
);
const [sendingReset, setSendingReset] = useState(false);
const [isForgotPassword, setIsForgotPassword] = useState(false);


const [isResetSent, setIsResetSent] = useState(false);




const [formData, setFormData] = useState({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
});
const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};

const validateForm = () => {

  // Common validations

  if (!formData.email.trim()) {
    toast.error("Email is required.");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(formData.email)) {
    toast.error("Please enter a valid email address.");
    return false;
  }

  if (!formData.password.trim()) {
    toast.error("Password is required.");
    return false;
  }

  if (formData.password.length < 8) {
    toast.error("Password must be at least 8 characters.");
    return false;
  }

  // Register validations

  if (!isLogin) {

    if (!formData.name.trim()) {
      toast.error("Name is required.");
      return false;
    }

    if (formData.name.trim().length < 3) {
      toast.error("Name should be at least 3 characters.");
      return false;
    }

    if (!formData.confirmPassword.trim()) {
      toast.error("Please confirm your password.");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }

  }

  return true;

};

const handleSubmit = async () => {
  if (!validateForm()) return;

  setLoading(true);

  try {
    if (isLogin) {
      const res = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      toast.success("Login successful!");

      navigate("/");
      window.location.reload();
    } else {
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match!");
        setLoading(false);
        return;
      }

      const res = await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      console.log("Registration Success:", res.data);

      toast.success("Account created successfully!");

      setIsLogin(true);
    }
  } catch (error) {
    console.error(error);

    toast.error(
      error.response?.data?.message ||
      "Something went wrong!"
    );
  } finally {
    setLoading(false);
  }
};
const handleForgotPassword = async () => {

  if (!formData.email.trim()) {
    toast.error("Please enter your email.");
    return;
  }

  setSendingReset(true);

  try {

    const res = await forgotPassword({
      email: formData.email,
    });

    toast.success(res.data.message);

    setIsResetSent(true);

  } catch (error) {

    toast.error(
      error.response?.data?.message ||
      "Unable to send reset email."
    );

  } finally {

    setSendingReset(false);

  }

};

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
    <section className="auth-page">

      {/* LEFT PANEL */}

      <div className="auth-left">

        <div className="circle circle1"></div>
        <div className="circle circle2"></div>
        <div className="circle circle3"></div>

        <div className="left-content">

          <div>

   <div className="logo">
    <div className="logo-icon">
        <img src={logo} alt="logo" />
    </div>

    <h3>BiteRush</h3>
</div>

            <div className="customer-badge">
              <FaUsers />
              <span>20K+ Happy Customers ⭐⭐⭐⭐⭐</span>
            </div>

            <h1>
              Every Bite,
              <br />
              Worth The
              <br />
              Rush.
            </h1>

            <p>
              Discover your favourite restaurants and enjoy
              fast delivery to your doorstep.
            </p>

<div className="stats">

  <div className="stat-card">

    <div className="stat-icon">
      <FaMotorcycle />
    </div>

    <div className="stat-info">
      <h3>30 min</h3>
      <span>Avg. Delivery</span>
    </div>

  </div>

  <div className="stat-card">

    <div className="stat-icon">
      <FaStar />
    </div>

    <div className="stat-info">
      <h3>4.9</h3>
      <span>App Rating</span>
    </div>

  </div>

</div>
  </div>
</div>
</div>


      {/* RIGHT PANEL */}

      <div className="auth-right">

        <div className="auth-card">

       {isForgotPassword ? (

  <>
    {!isResetSent ? (

      <>
        <h2>Forgot Password?</h2>

        <p className="subtitle">
          Enter your registered email address and we'll send you a password reset link.
        </p>

        <label>EMAIL ADDRESS</label>

        <div className="input-box">
          <FaEnvelope />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
          />
        </div>

<button
  className="create-btn"
  onClick={handleForgotPassword}
  disabled={sendingReset}
>
  {sendingReset
    ? "Sending..."
    : "Send Reset Link →"}
</button>
        <p
          className="forgot"
          onClick={() => {
            setIsForgotPassword(false);
            setIsResetSent(false);
          }}
          style={{ cursor: "pointer", marginTop: "20px" }}
        >
          ← Back to Login
        </p>

      </>

    ) : (

      <>
        <h2>Reset Link Sent!</h2>

        <p className="subtitle">
          We've sent a password reset link to your email.
          Please check your inbox.
        </p>

        <button
          className="create-btn"
          onClick={() => {
            setIsForgotPassword(false);
            setIsResetSent(false);
          }}
        >
          Back To Login
        </button>

      </>

    )}
  </>

) : (

<>

  <h2>
    {isLogin ? "Welcome back" : "Create your account"}
  </h2>

  <p className="subtitle">
    {isLogin
      ? "Good to see you again."
      : "Join thousands of food lovers today."}
  </p>

  <div className="auth-switch">

    <div
      className={`switch-slider ${isLogin ? "right" : ""}`}
    ></div>

    <button
      className={!isLogin ? "active" : ""}
      onClick={() => setIsLogin(false)}
    >
      Sign Up
    </button>

    <button
      className={isLogin ? "active" : ""}
      onClick={() => setIsLogin(true)}
    >
      Sign In
    </button>

  </div>

          {!isLogin && (

            <>

              <label>FULL NAME</label>

              <div className="input-box">
                <FaUser />
                <input
  name="name"
  value={formData.name}
  onChange={handleChange}
  placeholder="John Appleseed"
/>
              </div>

            </>

          )}

          <label>EMAIL ADDRESS</label>

          <div className="input-box">
            <FaEnvelope />
            <input
  name="email"
  value={formData.email}
  onChange={handleChange}
  placeholder="john@example.com"
/>
          </div>

          <label>PASSWORD</label>

          <div className="input-box">

            <FaLock />
<input
  name="password"
  value={formData.password}
  onChange={handleChange}
  type={showPassword ? "text" : "password"}
  placeholder="Create a strong password"
/>

            {showPassword ? (
              <FaEyeSlash
                className="eye"
                onClick={() =>
                  setShowPassword(false)
                }
              />
            ) : (
              <FaEye
                className="eye"
                onClick={() =>
                  setShowPassword(true)
                }
              />
            )}

          </div>

          {!isLogin && (

            <>

              <label>CONFIRM PASSWORD</label>

              <div className="input-box">

                <FaLock />

                <input
  name="confirmPassword"
  value={formData.confirmPassword}
  onChange={handleChange}
  type={showConfirm ? "text" : "password"}
  placeholder="Repeat your password"
/>

                {showConfirm ? (
                  <FaEyeSlash
                    className="eye"
                    onClick={() =>
                      setShowConfirm(false)
                    }
                  />
                ) : (
                  <FaEye
                    className="eye"
                    onClick={() =>
                      setShowConfirm(true)
                    }
                  />
                )}

              </div>

            </>

          )}

          {isLogin && !isForgotPassword && (
  <p
    className="forgot"
    onClick={() => setIsForgotPassword(true)}
    style={{ cursor: "pointer" }}
  >
    Forgot Password?
  </p>
)}

  <button
  type="button"
  className="create-btn"
  onClick={handleSubmit}
  disabled={loading}
>
  {loading
    ? (isLogin ? "Logging in..." : "Creating Account...")
    : (isLogin ? "Login" : "Register")}
</button>

</>
            )}
      </div>
      </div>
    </section>
    </>
  );
}
export default AuthPage;