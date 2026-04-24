import React from "react";
import "./Roles.css";

const Roles = () => {
  return (
    <section className="roles">
      <h2>Unified Role Management</h2>

      <div className="roles-grid">
        <div className="role-card">
          <h3>Student</h3>
          <p>Daily Dining Companion</p>
        </div>

        <div className="role-card">
          <h3>Admin</h3>
          <p>Operations Control Center</p>
        </div>

        <div className="role-card">
          <h3>Warden</h3>
          <p>Compliance & Insights</p>
        </div>
      </div>
    </section>
  );
};

export default Roles;