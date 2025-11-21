"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/providers/AuthProvider";

export default function Login() {
  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogin = async () => {
    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.SERVER_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || "Invalid credentials");
        setLoading(false);
        return;
      }

      login(data.token);
    } catch {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className=" bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-surface shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-semibold text-foreground mb-6 text-center">
          Login
        </h1>

        {error && (
          <p className="text-red-600 text-center text-sm mb-4">{error}</p>
        )}

        <div className="space-y-5">
          <Input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
            className="border text-foreground"
          />

          <Input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
            className="border text-foreground"
          />

          <p className="text-shadow">
            Forgot password? <Button variant={"link"}>Reset here</Button>
          </p>

          <Button
            disabled={loading}
            onClick={handleLogin}
            className="w-full bg-primary hover:bg-secondary text-white"
          >
            {loading ? "Logging in..." : "Login"}
          </Button>
        </div>
      </div>
    </div>
  );
}
