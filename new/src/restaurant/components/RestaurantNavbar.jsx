import { FaBell, FaSearch } from "react-icons/fa";


function RestaurantNavbar() {
  return (
    <header className="rp-navbar">

      <div className="rp-navbar-left">

        <h2 className="rp-navbar-title">
          Restaurant Dashboard
        </h2>

        <p className="rp-navbar-subtitle">
          Welcome back! Here's what's happening today.
        </p>

      </div>

      <div className="rp-navbar-right">

        {/* Search */}

        <div className="rp-navbar-search">

          <FaSearch className="rp-navbar-search-icon" />

          <input
            type="text"
            placeholder="Search..."
          />

        </div>

        {/* Notification */}

        <button className="rp-navbar-notification">

          <FaBell />

          <span className="rp-navbar-dot"></span>

        </button>

        {/* Profile */}

        <div className="rp-navbar-profile">

          <div className="rp-navbar-avatar">
            B
          </div>

          <div className="rp-navbar-user">

            <h4>BiteRush</h4>

            <span>Restaurant Owner</span>

          </div>

        </div>

      </div>

    </header>
  );
}

export default RestaurantNavbar;