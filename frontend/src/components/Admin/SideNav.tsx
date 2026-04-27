import React from 'react';
import './SideNav.css';

const SideNav: React.FC = () => {
  const menuItems = [
    { name: 'Dashboard', icon: '📊', active: true },
    { name: 'Inventory', icon: '📦', active: false },
    { name: 'Meal Planning', icon: '🍴', active: false },
    { name: 'Student Directory', icon: '👥', active: false },
    { name: 'Financials', icon: '💵', active: false },
    { name: 'Reports', icon: '📈', active: false },
  ];

  return (
    <aside className="sidenav">
      <div className="brand">
        <div className="brand-icon">🍴</div>
        <div className="brand-text">
          <h1>Dining Ops</h1>
          <span>Main Campus</span>
        </div>
      </div>

      <nav className="menu">
        {menuItems.map((item) => (
          <button key={item.name} className={`menu-item ${item.active ? 'active' : ''}`}>
            <span className="icon">{item.icon}</span>
            {item.name}
          </button>
        ))}
      </nav>

      <div className="sidenav-footer">
        <button className="quick-checkin">Quick Check-in</button>
        <button className="footer-link">❓ Support</button>
        <button className="footer-link logout">↪ Logout</button>
      </div>
    </aside>
  );
};

export default SideNav;