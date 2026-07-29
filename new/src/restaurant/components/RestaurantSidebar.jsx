import {
  
  FaHome,
  FaUtensils,
  FaClipboardList,
  FaChartLine,
  FaUserCog,
  FaSignOutAlt,
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo2.png";
function RestaurantSidebar() {
  const navigate = useNavigate();

const handleLogout = () => {

  localStorage.removeItem("restaurantToken");
  localStorage.removeItem("restaurant");

  navigate("/restaurant/login");
};
  return (
    <aside className="rp-sidebar">

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