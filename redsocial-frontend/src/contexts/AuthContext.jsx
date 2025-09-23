import React, { createContext, useContext, useState } from 'react';
import { login as apiLogin, register as apiRegister } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    const res = await apiLogin(username, password);
    setToken(res.token);
    localStorage.setItem('token', res.token);
    // opcional: decode token para obtener username, etc.
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setUser(null);
  };

  const register = async (username, password) => {
    return await apiRegister(username, password);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
