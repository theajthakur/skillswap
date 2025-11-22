import { Ban, Loader2, Lock } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
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
  isLogin: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>({
    name: "",
    email: "",
    id: "",
  });
  const pathname = usePathname();
  const router = useRouter();

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
        setUser({ name: "", email: "", id: "" });
        return;
      }

      const data = await response.json();

      if (data?.valid) {
        setToken(storedToken);
        setUser(data.user);
      } else {
        localStorage.removeItem("skillswap_token");
        setToken("");
        setUser({ name: "", email: "", id: "" });
      }
    } catch {
      localStorage.removeItem("skillswap_token");
      setToken("");
      setUser({ name: "", email: "", id: "" });
    }
  };

  useEffect(() => {
    verifyToken();
  }, []);

  useEffect(() => {
    if (!token) {
      localStorage.removeItem("skillswap_token");
      setUser({ name: "", email: "", id: "" });
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
    setUser({ name: "", email: "", id: "" });
  };

  const allowedPages = ["/", "/auth", "/get-started", "/api/test-prisma"];
  useEffect(() => {
    if (!user?.name && !allowedPages.includes(pathname)) {
      router.push("/auth");
    }
    if (user?.name && user.email && user.id) setIsLogin(true);
    else setIsLogin(false);
  }, [user, pathname, router]);

  return (
    <AuthContext.Provider value={{ token, user, isLogin, login, logout }}>
      {allowedPages.includes(pathname) ? (
        <>{children}</>
      ) : (
        <div className="min-h-screen w-full bg-background flex items-center justify-center p-6">
          <div className="bg-surface text-foreground/50 shadow-xl border rounded-2xl p-8 max-w-md w-full flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
              <Lock className="text-destructive" size={30} />
            </div>

            <h2 className="text-2xl font-semibold text-foreground text-center">
              Login Required
            </h2>

            <p className="text-center text-sm leading-relaxed">
              You must be logged in before accessing this page.
              <br />
              Please authenticate to continue.
            </p>

            <div className="flex items-center gap-2 text-sm pt-2">
              <Loader2 className="animate-spin" size={18} />
              <span>"{pathname}" Redirecting to login...</span>
            </div>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
