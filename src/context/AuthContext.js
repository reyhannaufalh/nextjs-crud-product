import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
import { axiosInstance } from "@/lib/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axiosInstance
        .get("/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data.user);
        })
        .catch(() => {
          localStorage.removeItem("token");
        });
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const { data } = await axiosInstance.post("/api/auth/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      setUser(data.user); // Assuming the backend also returns user data
      router.push("/");
    } catch (error) {
      console.error("Login failed:", error);
      console.error("Response data:", error.response.data); // Log response data
      console.error("Response status:", error.response.status); // Log response status
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
