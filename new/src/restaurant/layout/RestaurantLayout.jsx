import { Outlet } from "react-router-dom";

import RestaurantSidebar from "../components/RestaurantSidebar";
import RestaurantNavbar from "../components/RestaurantNavbar";
import "../styles/Restaurant-panel.css";


function RestaurantLayout() {
  return (
    <div className="rp-layout">

      {/* Sidebar */}

      <aside className="rp-layout-sidebar">
        <RestaurantSidebar />
      </aside>

      {/* Main Content */}

      <div className="rp-layout-main">

        {/* Top Navbar */}

        <RestaurantNavbar />

        {/* Page Content */}

        <main className="rp-layout-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
}

export default RestaurantLayout;