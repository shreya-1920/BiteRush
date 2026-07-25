import {
  FaStore,
  FaHome,
  FaUtensils,
  FaClipboardList,
  FaChartLine,
  FaUserCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";



function RestaurantSidebar() {
  return (
    <aside className="rp-sidebar">

      {/* Logo */}

      <div className="rp-sidebar-logo">

        <div className="rp-sidebar-logo-icon">
          <FaStore />
        </div>

        <div className="rp-sidebar-logo-text">
          <h2>BiteRush</h2>
          <span>Restaurant Panel</span>
        </div>

      </div>

      {/* Menu */}

      <nav className="rp-sidebar-menu">

        <NavLink
          to="/restaurant/dashboard"
          className="rp-sidebar-link"
        >
          <FaHome />
          <span>Dashboard</span>
        </NavLink>

        <NavLink
          to="/restaurant/menu"
          className="rp-sidebar-link"
        >
          <FaUtensils />
          <span>Menu</span>
        </NavLink>

        <NavLink
          to="/restaurant/orders"
          className="rp-sidebar-link"
        >
          <FaClipboardList />
          <span>Orders</span>
        </NavLink>

        <NavLink
          to="/restaurant/analytics"
          className="rp-sidebar-link"
        >
          <FaChartLine />
          <span>Analytics</span>
        </NavLink>

        <NavLink
          to="/restaurant/profile"
          className="rp-sidebar-link"
        >
          <FaUserCog />
          <span>Restaurant Profile</span>
        </NavLink>

      </nav>

      {/* Footer */}

      <div className="rp-sidebar-footer">

        <button className="rp-sidebar-logout">

          <FaSignOutAlt />

          <span>Logout</span>

        </button>

      </div>

    </aside>
  );
}

export default RestaurantSidebar;