import { FaEnvelope } from "react-icons/fa";
import { useState } from "react";
function ForgotPassword() {
  const [isSent, setIsSent] = useState(false);
  return (
    <div className="forgot-card">
      {!isSent ? (
        <>
          <h2>Forgot Password?</h2>
          <p>
            Enter your registered email address.
            We'll send you a password reset link.
          </p>
          <div className="forgot-input-">
            <FaEnvelope />
            <input type="email" placeholder="Enter your email" />
          </div>
          <button className="forgot-auth-btn" onClick={() => setIsSent(true)}>
            Send Reset Link
          </button>
          <button className="forgot-back-btn">← Back to Login</button>
        </>
      ) : (
        <>
          <h2>Reset Link Sent</h2>
          <p>Please check your email for the reset link.</p>
          <button className="back-btn" onClick={() => setIsSent(false)}>
            ← Back to Login
          </button>
        </>
      )}
    </div>
  );
}

export default ForgotPassword;