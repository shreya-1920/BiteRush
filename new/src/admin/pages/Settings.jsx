import { useEffect, useState } from "react";
import { FaCog, FaTruck, FaSave } from "react-icons/fa";
import { toast } from "react-toastify";

import {
  getSettings,
  updateSettings,
} from "../services/AdminSettingServices";

function Settings() {
  const [settings, setSettings] = useState({
    restaurantName: "",
    email: "",
    phone: "",
    address: "",
    deliveryFee: "",
    freeDeliveryAbove: "",
    gst: "",
    currency: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const data = await getSettings();
      setSettings(data);
    } catch (error) {
      toast.error("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      await updateSettings(settings);
      toast.success("Settings updated successfully");
    } catch (error) {
      toast.error("Failed to update settings");
    }
  };

  if (loading) {
    return <h3>Loading Settings...</h3>;
  }

  return (
    <div className="settings-page">
      <div className="page-header">
        <div>
          <h2>Platform Settings</h2>
          <p>Manage BiteRush platform configuration</p>
        </div>
      </div>

      <div className="settings-card">

        {/* General Settings */}

        <div className="settings-section">
          <h3>
            <FaCog />
            General Settings
          </h3>

          <div className="settings-grid">

            <div className="input-group">
              <label>Restaurant Name</label>
              <input
                name="restaurantName"
                value={settings.restaurantName}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={settings.email}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Phone</label>
              <input
                name="phone"
                value={settings.phone}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Address</label>
              <input
                name="address"
                value={settings.address}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Currency</label>
              <input
                name="currency"
                value={settings.currency}
                onChange={handleChange}
              />
            </div>

          </div>
        </div>

        {/* Delivery Settings */}

        <div className="settings-section">
          <h3>
            <FaTruck />
            Delivery Settings
          </h3>

          <div className="settings-grid">

            <div className="input-group">
              <label>Delivery Fee</label>
              <input
                type="number"
                name="deliveryFee"
                value={settings.deliveryFee}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>Free Delivery Above</label>
              <input
                type="number"
                name="freeDeliveryAbove"
                value={settings.freeDeliveryAbove}
                onChange={handleChange}
              />
            </div>

            <div className="input-group">
              <label>GST (%)</label>
              <input
                type="number"
                name="gst"
                value={settings.gst}
                onChange={handleChange}
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