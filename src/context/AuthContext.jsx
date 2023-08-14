import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userValues, setUser] = useState({});

  const LoginData = (userValues) => {
    setUser(userValues)
}

  const valueContext = {
    isAuthenticated, 
    setIsAuthenticated, 
    LoginData,
    userValues
  }

  return (
    <AuthContext.Provider value={valueContext}>
      {children}
    </AuthContext.Provider>
  );
}