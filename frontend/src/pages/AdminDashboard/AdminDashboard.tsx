import React from "react";
import "./AdminDashboard.css";

import SideNav from "../../components/Admin/SideNav";
import TopBar from "../../components/Admin/TopBar";
import KPICards from "../../components/Admin/KPICards";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">

      {/* Sidebar */}
      <SideNav />

      {/* Right Section */}
      <div className="admin-main">

        {/* Top Bar */}
        <TopBar />

        {/* Page Content */}
        <main className="admin-content">
          <div className="content-header">
            <div>
              <h1>Operations Overview</h1>
              <p>Real-time monitoring of campus dining services.</p>
            </div>

            <div className="actions">
              <button className="btn-secondary">📅 Today</button>
              <button className="btn-primary">⬇ Export</button>
            </div>
          </div>

          {/* KPI Section */}
          <KPICards />

        </main>

      </div>
    </div>
  );
};

export default AdminDashboard;