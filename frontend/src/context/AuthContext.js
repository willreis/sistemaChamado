// AuthContext.js

import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState(""); // Estado para armazenar o nome do usuário

  const login = (user) => {
    setIsAuthenticated(true);
    setUserName(user.displayName || "Usuário"); // Defina o nome do usuário
    console.log("Usuario: ", user)
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserName("");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
