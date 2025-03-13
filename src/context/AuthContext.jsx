import { createContext, useState, useEffect } from "react";
import { verifyUser, logoutUser } from "../api/auth"; // ✅ Ensure this is correct

export const AuthContext = createContext(null); // ✅ Initialize with `null`

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const userData = await verifyUser();
      setUser(userData);
      setLoading(false);
    };
    checkUser();
  }, []);

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
