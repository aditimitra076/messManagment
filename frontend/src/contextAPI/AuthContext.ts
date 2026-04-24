import { createContext } from "react";

export interface AuthContextType {
  email: string;
  setEmail: (email: string) => void;
  otp: string;
  setOtp: (otp: string) => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);