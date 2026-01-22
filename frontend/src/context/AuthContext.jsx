import { createContext, useContext, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 🔁 Init state lazily to avoid useEffect sync setState
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => {
    return localStorage.getItem("token") ? {} : null;
  });

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
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      register,
      logout,
      loading: false
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
