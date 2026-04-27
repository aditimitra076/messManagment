import "./Alerts.css";

const Alerts = () => {
  return (
    <div className="alerts">
      <h3>Critical Alerts</h3>

      <div className="alert red">
        <p><strong>Low Ratings: Mess B</strong></p>
        <span>Rating dropped to 3.1</span>
      </div>

      <div className="alert orange">
        <p><strong>High Waste: Mess C</strong></p>
        <span>Waste exceeded 18%</span>
      </div>
    </div>
  );
};

export default Alerts;