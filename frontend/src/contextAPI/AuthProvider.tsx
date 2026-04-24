import React, { useState } from "react";
import { AuthContext } from "./AuthContext";

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  return (
    <AuthContext.Provider value={{ email, setEmail, otp, setOtp }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;