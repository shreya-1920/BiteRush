import { useState } from "react";
import {
  FaCog,
  FaTruck,
  FaCreditCard,
  FaBell,
  FaLock,
  FaSave,
} from "react-icons/fa";
import { toast } from "react-toastify";
function Settings() {

  const [settings, setSettings] = useState({
    platformName: "BiteRush",
    supportEmail: "support@biterush.com",
    supportPhone: "+91 9876543210",
    currency: "INR (₹)",

    deliveryFee: "₹40",
    freeDelivery: "₹499",
    deliveryRadius: "10 KM",

    cod: true,
    upi: true,
    cards: true,
    wallet: false,

    emailNotification: true,
    pushNotification: true,
    smsNotification: false,

    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {

    const { name, value, type, checked } = e.target;

    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });

  };

  const handleSave = () => {

    console.log(settings);

    toast.success("Settings saved successfully!");

  };

  return (

    <div className="settings-page">

      <div className="page-header">

        <div>

          <h2>Platform Settings</h2>

          <p>Manage BiteRush platform configuration</p>

        </div>

      </div>

      <div className="settings-card">

        {/* General */}

        <div className="settings-section">

          <h3>

            <FaCog />

            General Settings

          </h3>

          <div className="settings-grid">

            <div className="input-group">

              <label>Platform Name</label>

              <input
                name="platformName"
                value={settings.platformName}
                onChange={handleChange}
              />

            </div>

            <div className="input-group">

              <label>Support Email</label>

              <input
                name="supportEmail"
                value={settings.supportEmail}
                onChange={handleChange}
              />

            </div>

            <div className="input-group">

              <label>Support Phone</label>

              <input
                name="supportPhone"
                value={settings.supportPhone}
                onChange={handleChange}
              />

            </div>

            <div className="input-group">

              <label>Currency</label>

              <select
                name="currency"
                value={settings.currency}
                onChange={handleChange}
              >

                <option>INR (₹)</option>

              </select>

            </div>

          </div>

        </div>

        {/* Delivery */}

        <div className="settings-section">

          <h3>

            <FaTruck />

            Delivery Settings

          </h3>

          <div className="settings-grid">

            <div className="input-group">

              <label>Delivery Fee</label>

              <input
                name="deliveryFee"
                value={settings.deliveryFee}
                onChange={handleChange}
              />

            </div>

            <div className="input-group">

              <label>Free Delivery Above</label>

              <input
                name="freeDelivery"
                value={settings.freeDelivery}
                onChange={handleChange}
              />

            </div>

            <div className="input-group">

              <label>Maximum Delivery Radius</label>

              <input
                name="deliveryRadius"
                value={settings.deliveryRadius}
                onChange={handleChange}
              />

            </div>

          </div>

        </div>

        {/* Payment */}

        <div className="settings-section">

          <h3>

            <FaCreditCard />

            Payment Settings

          </h3>

          <div className="checkbox-group">

            <label>

              <input
                type="checkbox"
                name="cod"
                checked={settings.cod}
                onChange={handleChange}
              />

              Cash on Delivery

            </label>

            <label>

              <input
                type="checkbox"
                name="upi"
                checked={settings.upi}
                onChange={handleChange}
              />

              UPI Payments

            </label>

            <label>

              <input
                type="checkbox"
                name="cards"
                checked={settings.cards}
                onChange={handleChange}
              />

              Credit / Debit Cards

            </label>

            <label>

              <input
                type="checkbox"
                name="wallet"
                checked={settings.wallet}
                onChange={handleChange}
              />

              Wallet Payments

            </label>

          </div>

        </div>
                {/* Notifications */}

        <div className="settings-section">

          <h3>
            <FaBell />
            Notifications
          </h3>

          <div className="checkbox-group">

            <label>
              <input
                type="checkbox"
                name="emailNotification"
                checked={settings.emailNotification}
                onChange={handleChange}
              />
              Email Notifications
            </label>

            <label>
              <input
                type="checkbox"
                name="pushNotification"
                checked={settings.pushNotification}
                onChange={handleChange}
              />
              Push Notifications
            </label>

            <label>
              <input
                type="checkbox"
                name="smsNotification"
                checked={settings.smsNotification}
                onChange={handleChange}
              />
              SMS Notifications
            </label>

          </div>

        </div>

        {/* Security */}

        <div className="settings-section">

          <h3>
            <FaLock />
            Security
          </h3>

          <div className="settings-grid">

            <div className="input-group">

              <label>Current Password</label>

              <input
                type="password"
                name="currentPassword"
                value={settings.currentPassword}
                onChange={handleChange}
                placeholder="Enter current password"
              />

            </div>

            <div className="input-group">

              <label>New Password</label>

              <input
                type="password"
                name="newPassword"
                value={settings.newPassword}
                onChange={handleChange}
                placeholder="Enter new password"
              />

            </div>

            <div className="input-group">

              <label>Confirm Password</label>

              <input
                type="password"
                name="confirmPassword"
                value={settings.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
              />

            </div>

          </div>

        </div>

        <button
          className="admin-btn"
          onClick={handleSave}
        >
          <FaSave />
          <span>Save Changes</span>
        </button>

      </div>

    </div>

  );

}

export default Settings;