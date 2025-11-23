"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const handleReset = async () => {
    setError("");
    setMsg("");
    setLoading(true);

    try {
      const res = await fetch(`${process.env.SERVER_URL}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.message || "Failed to send reset email");
        setLoading(false);
        return;
      }

      setMsg("Password reset link has been sent to your email.");
    } catch {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-surface shadow-lg rounded-xl p-8">
        <h1 className="text-2xl font-semibold text-foreground mb-6 text-center">
          Reset Password
        </h1>

        {error && (
          <p className="text-red-600 text-sm text-center mb-4">{error}</p>
        )}
        {msg && (
          <p className="text-green-600 text-sm text-center mb-4">{msg}</p>
        )}

        <div className="flex flex-col gap-5">
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border text-foreground"
          />

          <Button
            onClick={handleReset}
            disabled={loading}
            className="w-full bg-primary hover:bg-secondary text-white"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </Button>
        </div>
      </div>
    </div>
  );
}
