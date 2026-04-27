import React from 'react';
import './TopBar.css';

const TopBar: React.FC = () => {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <h2 className="app-name">MessMaster Pro</h2>
        <div className="search-container">
          <input type="text" placeholder="Search data..." />
        </div>
      </div>
      
      <div className="topbar-right">
        <button className="icon-btn">🔔</button>
        <button className="icon-btn">⚙️</button>
        <div className="user-profile">
          <div className="user-info">
            <span className="user-name">Warden</span>
            <span className="user-role">ADMINISTRATOR</span>
          </div>
          <div className="user-avatar">👤</div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;