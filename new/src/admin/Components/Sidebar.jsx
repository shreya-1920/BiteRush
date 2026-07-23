import {
  FaTachometerAlt,
  FaUtensils,
  FaPizzaSlice,
  FaClipboardList,
  FaUsers,
  FaTags,
  FaEnvelope,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import logo2 from "../../assets/images/logo2.png";
import { NavLink, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");

    navigate("/admin/login");
  };

  return (
    <aside className="admin-sidebar">
<div className="sidebar-logo">

  <div className="brand">
    <img src={logo2} alt="Logo" className="brand-icon" />

    <h1 className="brand-name">
      <span className="bite">Bite</span>
      <span className="rush">Rush</span>
    </h1>
  </div>

  <p className="admin-title">Admin Panel</p>

</div>

      <nav className="sidebar-menu">

        <NavLink to="/admin/dashboard">
          <FaTachometerAlt />
          Dashboard
        </NavLink>

        <NavLink to="/admin/restaurants">
          <FaUtensils />
          Restaurants
        </NavLink>

        <NavLink to="/admin/menu">
          <FaPizzaSlice />
          Menu
        </NavLink>

        <NavLink to="/admin/orders">
          <FaClipboardList />
          Orders
        </NavLink>

        <NavLink to="/admin/customers">
          <FaUsers />
          Customers
        </NavLink>

        <NavLink to="/admin/coupons">
          <FaTags />
          Coupons
        </NavLink>

        <NavLink to="/admin/messages">
          <FaEnvelope />
          Messages
        </NavLink>

        <NavLink to="/admin/settings">
          <FaCog />
          Settings
        </NavLink>

      </nav>

     <div className="sidebar-bottom">

    <button
        className="logout-btn"
        onClick={logout}
    >
        <FaSignOutAlt />
        Logout
    </button>

</div>

    </aside>
  );
}

export default Sidebar;