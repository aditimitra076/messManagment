import React from "react";
import "./CTA.css";

const CTA = () => {
  return (
    <section className="cta">
      <h2>Ready to Modernize Your Mess?</h2>
      <p>Join 150+ institutions saving costs.</p>

      <div className="cta-buttons">
        <button className="primary">Schedule Demo</button>
        <button className="secondary">Contact Sales</button>
      </div>
    </section>
  );
};

export default CTA;