import React, { useContext } from "react";
import "./LoginForm.css";
import { AuthContext } from "../../contextAPI/AuthContext";

const LoginForm = () => {
  const auth = useContext(AuthContext);

  if (!auth) return null;

  const { email, setEmail, otp, setOtp } = auth;

  return (
    <div className="login-card">
      <h2>Sign In</h2>
      <p>Access your dining dashboard and meal plans</p>

      <label>College Email</label>
      <input
        type="email"
        placeholder="user@uohyd.ac.in"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button className="primary-btn">Send OTP →</button>

      <div className="divider">VERIFICATION</div>

      <label>Enter 6-digit Code</label>
      <label htmlFor="otp">Enter 6-digit Code</label>

        <input
        id="otp"
        type="text"
        maxLength={6}
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        />

      <button className="primary-btn">Verify & Continue</button>

      <p className="resend">⟳ Resend OTP</p>
    </div>
  );
};

export default LoginForm;