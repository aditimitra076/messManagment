import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-left">
        <span className="badge">NEXT GEN DINING SOLUTIONS</span>

        <h1>
          Smart Mess <br />
          <span>Management System</span>
        </h1>

        <p>
          Streamline dining operations with analytics, inventory,
          and automation.
        </p>

        <div className="hero-buttons">
          <button className="primary">Get Started</button>
          <button className="secondary">Watch Demo ▶</button>
        </div>
      </div>

      <div className="hero-right"></div>
    </section>
  );
};

export default Hero;