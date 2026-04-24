import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">
        <div>
          <h3>MessMaster Pro</h3>
          <p>Future of dining.</p>
        </div>

        <div>
          <h4>Product</h4>
          <p>Features</p>
          <p>Pricing</p>
        </div>

        <div>
          <h4>Company</h4>
          <p>About</p>
          <p>Contact</p>
        </div>

        <div>
          <h4>Legal</h4>
          <p>Privacy</p>
          <p>Terms</p>
        </div>
      </div>

      <p className="copyright">© 2024 MessMaster</p>
    </footer>
  );
};

export default Footer;