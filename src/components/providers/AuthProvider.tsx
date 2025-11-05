import React, { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  token: string | null;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const verifyToken = async () => {
      const storedToken = localStorage.getItem("skillswap_token");
      if (!storedToken) return; // no token to verify

      try {
        const response = await fetch(`${process.env.SERVER_URL}/auth/ping`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: storedToken }),
        });

        if (!response.ok) {
          // Invalid or expired token
          console.warn("Token verification failed:", response.status);
          localStorage.removeItem("skillswap_token");
          setToken(null);
          return;
        }

        // Optionally, verify the response body (e.g., check if the server confirms validity)
        const data = await response.json();
        if (data?.valid) {
          setToken(storedToken);
          setUser(data.user);
        } else {
          localStorage.removeItem("skillswap_token");
          setToken(null);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        localStorage.removeItem("skillswap_token");
        setToken(null);
      }
    };

    verifyToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
