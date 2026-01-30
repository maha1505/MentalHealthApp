import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // Hardcoded personal user session
  const [user] = useState({
    id: "660000000000000000000001",
    name: "Me",
    email: "me@personal.app"
  });

  // Mock functions for compatibility (no-op)
  const login = async () => { };
  const googleLogin = async () => { };
  const register = async () => { };
  const logout = () => { };

  return (
    <AuthContext.Provider value={{ user, token: 'personal-token', login, googleLogin, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
