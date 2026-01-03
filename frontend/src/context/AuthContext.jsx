import { createContext, useContext, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    setToken(res.data.accessToken);
localStorage.setItem("token", res.data.accessToken);

    setUser({ email });
  };

  const register = async (name, email, password) => {
    await api.post("/auth/register", { name, email, password });
  };

  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
