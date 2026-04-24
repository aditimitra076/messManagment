import React from "react";
import "./Features.css";

const Features = () => {
  return (
    <section className="features">
      <h2>Powered by Efficiency</h2>
      <p>Intelligent modules designed to solve dining challenges.</p>

      <div className="feature-grid">
        <div className="card">Smart Analytics</div>
        <div className="card">Subscription</div>
        <div className="card">Expense Tracking</div>
        <div className="card">Feedback</div>
      </div>
    </section>
  );
};

export default Features;