import { useState } from "react";
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaShieldAlt, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginAdmin } from "../Services/adminServices";
import "../styles/adminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    if (!formData.email || !formData.password) {
      toast.error("Please fill all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await loginAdmin(formData);

      localStorage.setItem("adminToken", res.token);
      localStorage.setItem("admin", JSON.stringify(res.admin));

      toast.success("Welcome Admin!");

      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="admin-login-page">

      <div className="admin-login-card">

        <div className="admin-icon">
          <FaShieldAlt />
        </div>

        <h2>BiteRush Admin</h2>

        <p>
          Sign in to manage restaurants,
          orders and customers.
        </p>

        <label>Email Address</label>

        <div className="admin-input">
          <FaEnvelope />
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <label>Password</label>

        <div className="admin-input">
          <FaLock />

          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
          />

          {showPassword ? (
            <FaEyeSlash
              className="eye"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <FaEye
              className="eye"
              onClick={() => setShowPassword(true)}
            />
          )}
        </div>

        
        <button
          className="admin-btn"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <button
          className="back-btn"
          onClick={() => navigate("/")}
        >
          <FaArrowLeft />
          Back to BiteRush
        </button>

      </div>

    </section>
  );
}

export default AdminLogin;