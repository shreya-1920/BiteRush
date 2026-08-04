import {
  FaHome,
  FaUtensils,
  FaClipboardList,
  FaChartLine,
  FaUserCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo2.png";

function RestaurantSidebar({
  sidebarOpen,
  setSidebarOpen,
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("restaurantToken");
    localStorage.removeItem("restaurant");

    setSidebarOpen(false);

    navigate("/restaurant/login");
  };

  return (
    <aside
      className={`rp-sidebar ${sidebarOpen ? "open" : ""}`}
    >
      {/* Logo */}

      <div className="rp-logo">
        <img
          src={logo}
          alt="BiteRush"
        />

        <div>
          <h2>BiteRush</h2>
          <p>Restaurant Panel</p>
        </div>
      </div>

      {/* Menu */}

      <nav className="rp-sidebar-menu">
        <NavLink
          to="/restaurant/dashboard"
          className="rp-sidebar-link"
          onClick={() => setSidebarOpen(false)}
        >
          <FaHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/restaurant/menu"
          className="rp-sidebar-link"
          onClick={() => setSidebarOpen(false)}
        >
          <FaUtensils />
          <span>Menu</span>
        </NavLink>

        <NavLink
          to="/restaurant/orders"
          className="rp-sidebar-link"
          onClick={() => setSidebarOpen(false)}
        >
          <FaClipboardList />
          <span>Orders</span>
        </NavLink>

        <NavLink
          to="/restaurant/analytics"
          className="rp-sidebar-link"
          onClick={() => setSidebarOpen(false)}
        >
          <FaChartLine />
          <span>Analytics</span>
        </NavLink>

        <NavLink
          to="/restaurant/profile"
          className="rp-sidebar-link"
          onClick={() => setSidebarOpen(false)}
        >
          <FaUserCog />
          <span>Restaurant Profile</span>
        </NavLink>
      </nav>

      {/* Footer */}

      <div className="rp-sidebar-footer">
        <button
          className="rp-sidebar-logout"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}

export default RestaurantSidebar;