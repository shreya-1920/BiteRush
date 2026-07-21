import "../styles/admin.css";
import { Outlet } from "react-router-dom";
import { useState } from "react";

import Sidebar from "../Components/Sidebar";
import Topbar from "../Components/Topbar";

function AdminLayout() {

    const [search, setSearch] = useState("");

    return (

        <div className="admin-layout">

            <Sidebar />

            <div className="admin-main">

                <Topbar
                    search={search}
                    setSearch={setSearch}
                />

                <main className="admin-content">

                    <Outlet context={{ search }} />

                </main>

            </div>

        </div>

    );

}

export default AdminLayout;