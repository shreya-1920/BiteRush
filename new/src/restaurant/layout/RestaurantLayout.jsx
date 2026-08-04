import { Outlet } from "react-router-dom";
import { useState } from "react";

import { SearchContext } from "../context/SearchContext";
import RestaurantSidebar from "../components/RestaurantSidebar";
import RestaurantNavbar from "../components/RestaurantNavbar";
import "../styles/Restaurant-panel.css";

function RestaurantLayout() {

    const [search, setSearch] = useState("");
const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
       <SearchContext.Provider value={{ search, setSearch }}>
        <div className="rp-layout">

            {/* Sidebar */}
          <aside
    className={`rp-layout-sidebar ${
        sidebarOpen ? "open" : ""
    }`}
>
                <RestaurantSidebar />
            </aside>
{sidebarOpen && (
    <div
        className="rp-overlay"
        onClick={() => setSidebarOpen(false)}
    ></div>
)}
            {/* Main Content */}
            <div className="rp-layout-main">

                {/* Navbar */}
                <RestaurantNavbar
                    search={search}
                    setSearch={setSearch}
                        setSidebarOpen={setSidebarOpen}
                />

                {/* Page Content */}
                <main className="rp-layout-content">

                    <Outlet
                       
                    />

                </main>

            </div>

        </div>
        </SearchContext.Provider>
    );
}

export default RestaurantLayout;