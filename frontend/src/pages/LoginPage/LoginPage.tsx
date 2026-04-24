import React from "react";
import "./LoginPage.css";
import LoginForm from "../../components/LoginForm/LoginForm";

const LoginPage = () => {
  return (
    <div className="login-page">

      {/* Navbar */}
      <div className="login-navbar">
        <h2>MessMaster Pro</h2>
        <span>University of Hyderabad • Student Portal</span>
      </div>

      {/* Center Form */}
      <div className="login-container">
        <LoginForm />
      </div>

      {/* Footer */}
      <div className="login-footer">
        <p>Secure • Instant • Official</p>
        <p className="terms">
          By signing in, you agree to Terms of Service
        </p>
      </div>

    </div>
  );
};

export default LoginPage;