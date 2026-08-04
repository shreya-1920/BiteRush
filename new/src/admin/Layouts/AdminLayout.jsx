import "../styles/admin.css";
import "../styles/adminResponsive.css";

import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";

function AdminLayout() {

    const [search, setSearch] = useState("");
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (

        <div className="admin-layout">

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <div className="admin-main">

                <Topbar
                    search={search}
                    setSearch={setSearch}
                    setSidebarOpen={setSidebarOpen}
                />

                <main className="admin-content">

                    <Outlet context={{ search }} />

                </main>

            </div>

        </div>

    );

}

export default AdminLayout;