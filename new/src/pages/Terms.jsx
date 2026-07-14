import Header from "../Components/Header";
import Footer from "../Components/Footer";
import "../styles/StaticPages.css";

function Terms() {
  return (
    <>
      <Header />

      <div className="static-page">

        <div className="static-container">

          <h1 className="static-title">
            Terms of Service
          </h1>

          <p className="static-subtitle">
            Please read these terms carefully before using BiteRush.
          </p>

          <div className="static-section">

            <h2>Using BiteRush</h2>

            <p>
              By accessing BiteRush, you agree to use the platform
              responsibly and comply with all applicable laws.
            </p>

          </div>

          <div className="static-section">

            <h2>Payments</h2>

            <p>
              All payments must be completed using the supported
              payment methods available during checkout.
            </p>

          </div>

          <div className="static-section">

            <h2>Order Cancellation</h2>

            <p>
              Orders may only be cancelled before the restaurant
              begins preparing your food.
            </p>

          </div>

          <div className="static-section">

            <h2>Refund Policy</h2>

            <p>
              Refunds are processed for eligible cancelled or
              unsuccessful orders according to our refund policy.
            </p>

          </div>

          <div className="static-section">

            <h2>User Responsibilities</h2>

            <p>
              Users are responsible for providing accurate account
              information and maintaining the confidentiality of
              their login credentials.
            </p>

          </div>

        </div>

      </div>

      <Footer />
    </>
  );
}

export default Terms;