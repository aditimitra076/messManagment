import React from "react";

import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">MessMaster Pro</h1>

      <ul className="nav-links">
        <li>Home</li>
        <li>Features</li>
        <li>Roles</li>
        <li>Pricing</li>
      </ul>

      <div className="nav-icons">
        <span>🔔</span>
        <span>⚙️</span>
        <div className="avatar"></div>
      </div>
    </nav>
  );
};

export default Navbar;