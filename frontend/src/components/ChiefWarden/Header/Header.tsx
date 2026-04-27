import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <div>
        <h2>Chief Warden Overview</h2>
        <p>Real-time performance analytics</p>
      </div>

      <div className="header-buttons">
        <button className="export">Export Report</button>
        <button className="new">+ New Assessment</button>
      </div>
    </div>
  );
};

export default Header;