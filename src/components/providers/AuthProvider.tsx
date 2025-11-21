import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  token: string;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);

  const verifyToken = async () => {
    const storedToken = localStorage.getItem("skillswap_token");
    if (!storedToken) return;

    try {
      const response = await fetch(`${process.env.SERVER_URL}/auth/ping`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: storedToken }),
      });

      if (!response.ok) {
        localStorage.removeItem("skillswap_token");
        setToken("");
        setUser(null);
        return;
      }

      const data = await response.json();

      if (data?.valid) {
        setToken(storedToken);
        setUser(data.user);
      } else {
        localStorage.removeItem("skillswap_token");
        setToken("");
        setUser(null);
      }
    } catch {
      localStorage.removeItem("skillswap_token");
      setToken("");
      setUser(null);
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  useEffect(() => {
    if (!token) {
      localStorage.removeItem("skillswap_token");
      setUser(null);
      return;
    }
    localStorage.setItem("skillswap_token", token);
  }, [token]);

  const login = (newToken: string) => {
    setToken(newToken);
    verifyToken();
  };

  const logout = () => {
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
